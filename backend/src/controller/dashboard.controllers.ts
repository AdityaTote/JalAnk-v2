import { ApiError } from "../utils/apiError.utils";
import { ApiResponse } from "../utils/apiResponse.utils";
import { asyncHandler } from "../utils/asyncHandler.utils";
import { WaterTrack, Profile, User } from "../db/db";

const handleDashboard = asyncHandler(async(req: any, res:any) => {

    try {
        const dashId = parseInt(req.params.id);
    
        const userLogged = req.user;
    
        if(!userLogged){
            throw new ApiError(
                401,
                "User is not authorize"
            )
        }
        
        const waterData = await WaterTrack.findUnique({
            where: {
                id: dashId,
            },
            select: {
                source: true,
                waterReceived: true,
                waterUsed:true,
                isActive:true,
                user: true,
                }
        })
    
        if(!waterData){
            throw new ApiError(
                500,
                "Unable to retrieve water tracking data. Please try again later. "
            )
        }
    
        const profieData = await Profile.findUnique({
            where: {
                userId: userLogged.id
            },
            select: {
                credit: true
            }
        })
    
        if(!profieData){
            throw new ApiError(
                500,
                "Unable to retrieve profile data. Please check your connection and try again."
            )
        }
    
        const waterRemain = Number(waterData.waterReceived) - Number(waterData.waterUsed);
    
        const waterSave = Number(waterData.waterReceived) - waterRemain
    
        const status = await WaterTrack.findMany({
            where: {
                id: dashId,
                isActive: true
            },
        })
    
        const activeProcess = status.length
    
        const statusTwo = await WaterTrack.findMany({
            where: {
                id: dashId,
                isActive: false
            },
        })
    
        const inActiveProcess = statusTwo.length
    
        const dashData = {
            OrgName: userLogged.name,
            email: userLogged.email,
            credit: profieData?.credit,
            source: waterData?.source,
            waterReceived: waterData?.waterReceived,
            waterUsed: waterData?.waterUsed,
            waterRemaining: waterRemain,
            waterSaving: waterSave,
            activeProcess: activeProcess,
            inActiveProcess: inActiveProcess,
        }

        return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        dashData,
                        "Dashboard data  sucessfully is send"
                    )
                )

    } catch (error: any) {
        throw new ApiError(
            500,
            error.message
        )
    }

})

export {
    handleDashboard
}