"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCloudnary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const cloudinaryConfig_utils_1 = require("./cloudinaryConfig.utils");
const apiError_utils_1 = require("./apiError.utils");
(0, cloudinaryConfig_utils_1.cloudConfig)();
const uploadCloudnary = (localPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if path does not present
        if (!localPath)
            return null;
        // if present then further
        const response = yield cloudinary_1.v2.uploader.upload(localPath);
        // console.log('file has been successfully uploaded!', response.url);
        fs_1.default.unlinkSync(localPath);
        return response;
    }
    catch (error) {
        fs_1.default.unlink(localPath, (err) => {
            if (err) {
                console.log(err.message);
                throw new apiError_utils_1.ApiError(500, err.message);
            }
        }); // removes the file uploaded locally
    }
});
exports.uploadCloudnary = uploadCloudnary;
