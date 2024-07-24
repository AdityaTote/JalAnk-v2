import { ApiError } from "../utils/apiError.utils";
import { ApiResponse } from "../utils/apiResponse.utils";
import { asyncHandler } from "../utils/asyncHandler.utils";
import { Transac, User, WaterTrack } from "../db/db";
import * as z from "zod";
import { error } from "console";

const inputSchema = z.object({
    processName: z.string({ required_error: "Name of process is required" }),
    sourceInput: z.string({ required_error: "Source Origin is required" }),
    sourceOutput: z.string({ required_error: "Source destination is required" }),
    waterTransfer: z.number({ required_error: "Amount if water transfer is required" }),
})

const handleTransactionCreation = asyncHandler(async(req: any,res: any) => {

    try {
        const parseData: object = inputSchema.safeParse(req.body);
    
        if(!parseData){
            throw new ApiError(
                401,
                "Error in parsing data"
            )
        }
    
        const user = req.user;
    
        if(!user){
            throw new ApiError(
                401,
                "User is Unauthorize"
            )
        }
    
        const credit = 0
        
        const transData = await Transac.create({
            data: {
                userId: user.id,
                processName: req.body.processName,
                sourceInput: req.body.sourceInput,
                sourceOutput: req.body.sourceOutput,
                waterTransfer: req.body.waterTransfer,
                processCredit: credit
            }
        })
    
        if(!transData){
            throw new ApiError(
                401,
                "Data is not found"
            )
        }
    
        return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        transData,
                        "Transaction data is Added"
                    )
                )
    } catch (error: any) {
        throw new ApiError(
            500,
            error.message
        )
    }

});

const handleTransactionDisplay = asyncHandler(async(req: any,res: any) => {

    try {
        const user = req.user
    
        if(!user){
            throw new ApiError(
                401,
                "User is Unauthorize"
            )
        }
    
        const transData = await Transac.findMany({
            where: {
                userId: user.id
            }
        })
    
        if(!transData){
            throw new ApiError(
                500,
                "Transaction data not found"
            )
        }

        return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        transData,
                        "Transaction Data recevied succesfully"
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
    handleTransactionCreation,
    handleTransactionDisplay
}