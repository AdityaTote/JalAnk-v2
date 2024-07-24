import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import { cloudConfig } from "./cloudinaryConfig.utils";
import { ApiError } from "./apiError.utils";

cloudConfig();

const uploadCloudnary = async (localPath: any) => {
    try {
    
        // if path does not present
        if(!localPath) { throw new ApiError(401,"File is not uploaded");}

        // if present then further
        const response = await cloudinary.uploader.upload(localPath);
        
        // console.log('file has been successfully uploaded!', response.url);
        fs.unlinkSync(localPath);
        return response;

    } catch (error) {
        
        fs.unlink(localPath, (err) => {
            if (err) {
                console.log(err.message);
                
                throw new ApiError(
                    500,
                    err.message
                )
            }
        }); // removes the file uploaded locally
    }
}

export { uploadCloudnary }