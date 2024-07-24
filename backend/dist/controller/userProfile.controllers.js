"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserProfileDisplay = exports.handleUserProfileCreation = void 0;
const asyncHandler_utils_1 = require("../utils/asyncHandler.utils");
const db_1 = require("../db/db");
const apiError_utils_1 = require("../utils/apiError.utils");
const z = __importStar(require("zod"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const apiResponse_utils_1 = require("../utils/apiResponse.utils");
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
    employeName: z.string({ required_error: "Employee Name is requored" }),
    designation: z.string({ required_error: "designation is requored" }),
    contactNum: z.string({ required_error: "Employee contact number  is requored" }),
    empolyeEmail: z.string({ required_error: "Employee Email is requored" })
});
const handleUserProfileCreation = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userProfileId = parseInt(req.params.id, 10);
        if (isNaN(userProfileId)) {
            throw new apiError_utils_1.ApiError(400, "Invalid ID format");
        }
        const user = req.user;
        if (!user) {
            throw new apiError_utils_1.ApiError(401, "User is not Authunticate");
        }
        ;
        const userData = userSchema.safeParse(req.body);
        if (!userData) {
            throw new apiError_utils_1.ApiError(401, "Error in parsing Input data");
        }
        const logoLocalPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const logo = yield (0, cloudinary_utils_1.uploadCloudnary)(logoLocalPath);
        if (logoLocalPath) {
            if (!logo) {
                throw new apiError_utils_1.ApiError(500, "Error in uploading img");
            }
        }
        const profileData = {
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
            employeName: req.body.employeName,
            designation: req.body.designation,
            contactNum: req.body.contactNum,
            empolyeEmail: req.body.empolyeEmail,
            logo: ""
        };
        if (logo === null || logo === void 0 ? void 0 : logo.url) {
            profileData.logo = logo.url;
        }
        if (user.email !== profileData.email) {
            yield db_1.User.update({
                where: { id: user.id },
                data: { email: req.body.email },
            });
        }
        const userProfile = yield db_1.Profile.upsert({
            where: { userId: user.id },
            update: profileData,
            create: Object.assign(Object.assign({ userId: user.id }, profileData), { industry: profileData.industry || '', address: profileData.address || '', phoneNum: profileData.phoneNum || '', websiteURL: profileData.websiteURL || '', certification: profileData.certification || '', sourceOfWater: profileData.sourceOfWater || '', employeName: profileData.employeName || '', designation: profileData.designation || '', empolyeEmail: profileData.empolyeEmail || '', contactNum: profileData.contactNum || '', gstNumber: profileData.gstNumber || '', registrationNum: profileData.registrationNum || '', taxNum: profileData.taxNum || '', logo: profileData.logo || '' }),
        });
        if (!userProfile) {
            throw new apiError_utils_1.ApiError(500, "Error in creating profile");
        }
        return res
            .status(200)
            .json(new apiResponse_utils_1.ApiResponse(200, userProfile, "Profile is successfully created"));
    }
    catch (error) {
        throw new apiError_utils_1.ApiError(500, error.message);
    }
}));
exports.handleUserProfileCreation = handleUserProfileCreation;
const handleUserProfileDisplay = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfileId = req.params.id;
    const profileId = parseInt(userProfileId, 10);
    if (isNaN(profileId)) {
        throw new apiError_utils_1.ApiError(400, "Invalid ID format");
    }
    try {
        const userProfileData = yield db_1.Profile.findUnique({
            where: {
                id: profileId
            },
            select: {
                id: true,
                userId: true,
                industry: true,
                logo: true,
                address: true,
                phoneNum: true,
                websiteURL: true,
                gstNumber: true,
                certification: true,
                registrationNum: true,
                taxNum: true,
                sourceOfWater: true,
                employeName: true,
                designation: true,
                contactNum: true,
                empolyeEmail: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
        });
        return res
            .status(200)
            .json(new apiResponse_utils_1.ApiResponse(200, userProfileData, "User profile is fetched"));
    }
    catch (error) {
        throw new apiError_utils_1.ApiError(500, error.message);
    }
}));
exports.handleUserProfileDisplay = handleUserProfileDisplay;
