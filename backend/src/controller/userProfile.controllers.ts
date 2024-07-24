import { asyncHandler } from "../utils/asyncHandler.utils";
import { Profile, User } from "../db/db";
import { ApiError } from "../utils/apiError.utils";
import * as z from "zod";
import { uploadCloudnary } from "../utils/cloudinary.utils";
import { ApiResponse } from "../utils/apiResponse.utils";

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    industry: z.string({ required_error: "industry type is required" }),
    address: z.string({ required_error: "Address is required" }),
    phoneNum: z.string({ required_error: "phone number is required" }),
    websitURL: z.string({ required_error: "website link is requored" }),
    gstNumber: z.string({ required_error: "GST number is required" }),
    certification: z.string(),
    registrationNum: z.string(),
    taxNum: z.string(),
    sourceOfWater: z.string({ required_error: "Source is requored" }),
    employeeName: z.string({ required_error: "Employee Name is requored" }),
    designation: z.string({ required_error: "designation is requored" }),
    contactNum: z.string({ required_error: "Employee contact number  is requored" }),
    employeeEmail: z.string({ required_error: "Employee Email is requored" })
});

const handleUserProfileCreation = asyncHandler(async(req: any,res: any) => {

    try {

        const userProfileId: number = parseInt(req.params.id, 10);

        if(isNaN(userProfileId)){
            throw new ApiError(
                400,
                "Invalid ID format"
            )
        }

        const user = req.user;
    
        if(!user){
            throw new ApiError(401, "User is not Authunticate")
        };
    
        const userData: object = userSchema.safeParse(req.body);
    
        if(!userData){
            throw new ApiError(
                401,
                "Error in parsing Input data"
            )
        }
        
        const logoLocalPath = req.file?.path;
        
        const logo: any = await uploadCloudnary(logoLocalPath);
        
        if(logoLocalPath){
            if(!logo){
                throw new ApiError(
                    500,
                    "Error in uploading img"
                )
            }
        }

        const profileData: any = {
            userId: user.id,
            industry: req.body.industry,
            address: req.body.address,
            phoneNum: req.body.phoneNum,
            websiteURL: req.body.websiteURL,
            gstNumber: req.body.gstNumber,
            certification: req.body.certification,
            registrationNum: req.body.registrationNum,
            taxNum: req.body.taxNum,
            sourceOfWater: req.body.sourceOfWater,
            employeeName: req.body.employeeName,
            designation: req.body.designation,
            contactNum: req.body.contactNum,
            employeeEmail: req.body.employeeEmail,
            logo: ""
        };

        if(logo?.url){
            profileData.logo = logo.url
            }

        if (user.email !== profileData.email) {
            await User.update({
                where: { id: user.id },
                data: { 
                    email: req.body.email,
                    name: req.body.name
                },
            });
        }
    
        const userProfile = await Profile.upsert({
            where: { userId: user.id },
            update: profileData,
            create: {
                userId: user.id,
                industry: profileData.industry || '',
                address: profileData.address || '',
                phoneNum: profileData.phoneNum || '',
                websiteURL: profileData.websiteURL || '',
                certification: profileData.certification || '',
                sourceOfWater: profileData.sourceOfWater || '',
                employeeName: profileData.employeeName || '',
                designation: profileData.designation || '',
                employeeEmail: profileData.employeeEmail || '',
                contactNum: profileData.contactNum || '',
                gstNumber: profileData.gstNumber || '',
                registrationNum: profileData.registrationNum || '',
                taxNum: profileData.taxNum || '',
                logo: profileData.logo || '',
            },
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
                        userProfile,
                        "Profile is successfully created"
                    )
                )
    } catch (error: any) {
        throw new ApiError(
            500,
            error.message
        )
    }

});

const handleUserProfileDisplay = asyncHandler(async(req: any,res: any) => {

    const userProfileId: string = req.params.id;

    const profileId: number = parseInt(userProfileId, 10);

    
    if (isNaN(profileId)) {
        throw new ApiError(
            400,
            "Invalid ID format"
        )
    }

    try {
        const userProfileData = await Profile.findUnique({
            where: {
                id: profileId
            }
        })

        return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        userProfileData,
                        "User profile is fetched"
                    )
                )
    } catch (error: any) {
        throw new ApiError(
            500,
            error.message
        )
    }
});


export {
    handleUserProfileCreation,
    handleUserProfileDisplay,
}