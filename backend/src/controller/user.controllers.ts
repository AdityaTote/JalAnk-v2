import * as z from "zod";
import validator from "validator";
import { asyncHandler } from "../utils/asyncHandler.utils";
import { ApiError } from "../utils/apiError.utils";
import { ApiResponse } from "../utils/apiResponse.utils";
import {
    hashPassword,
    checkPassword
} from "../utils/auth.utils"
import { User, Profile, WaterTrack } from "../db/db";
import { cookieJwt } from "../utils/cookieJwt.utils"



const userSchema = z.object({
    name: z.string({required_error: "name is required"}),
    email: z.string({required_error: "phone number is required"}).email({message: "Invalid email address"}),
    password: z.string({required_error: "password is required"}),
});

const option = {
    httpOnly: true,
    secure: true
};


const handleUserSignIn = asyncHandler(async(req: any,res: any) => {

    try {
        const userData: object = userSchema.safeParse(req.body)
            
        if(!userData){
            throw new ApiError(401, "Error in Parsing Input data")
        }
        
        const plainPass: string  = req.body.password
        const hashPass: string = await hashPassword(plainPass);
        
        if(!hashPass){
            throw new ApiError(500, "password not obtained in hash")
        }
        
        const user = await User.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashPass
            }
        })

        if(!user){
            throw new ApiError(500, "User is not created")
        }

        const { password, ...userWithoutPassword } = user;

        const profileData: any = {
            userId: user.id,
            industry: "",
            address: "",
            phoneNum: "",
            websiteURL: "",
            gstNumber: "",
            certification: "",
            registrationNum: "",
            taxNum: "",
            sourceOfWater: "",
            employeeName: "",
            designation: "",
            contactNum: "",
            employeeEmail: "",
            logo: "",
        };

        const userProfile = await Profile.create({
            data: profileData
    })
    
        if(!userProfile){
            throw new ApiError(
                500,
                "Error in creating profile"
            )
        }
    
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    userWithoutPassword,
                    "User is Registered Succesfully"
                )
            )
    } catch (error: any) {
        throw new ApiError(500, error.message)
    }
})

const handeUserLogin = asyncHandler(async (req: any,res: any) => {

    try {
        const userData: object = userSchema.safeParse(req.body);
    
        if(!userData){
            throw new ApiError(401, "Error in Parsing Input data")
        }

        const userEmail: string = req.body.email
        const userPassword: string =  req.body.password
    
        const user = await User.findUnique({
            where: {
                email: userEmail
            }
        });

        if(!user){
            throw new ApiError(
                401,
                "User is invalid"
            )
        };

        const hashPass = user.password;
    
        const verifyPass = await checkPassword(hashPass, userPassword);
    
        if(!verifyPass){
    
            throw new ApiError(
                401,
                "Password is incorrect"
            )
        }

        cookieJwt(user, res)

        return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            user,
                            "User is logged in"
                        )
                    )
    
        
    } catch (error: any) {
        throw new ApiError(
            500,
            error.message
        )
    }

});

const handleUserLogout = asyncHandler(async(req: any,res: any) => {

    const user = req.user;
    if(!user){
        throw new ApiError(
            401,
            "User is not authenticated"
        )
    }

    return res
            .status(200)
            .clearCookie("sessionId", option)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "User is loggged out succesfully"
                )
            )
})

export {
    handleUserSignIn,
    handeUserLogin,
    handleUserLogout
}