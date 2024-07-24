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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserLogout = exports.handeUserLogin = exports.handleUserSignIn = void 0;
const z = __importStar(require("zod"));
const asyncHandler_utils_1 = require("../utils/asyncHandler.utils");
const apiError_utils_1 = require("../utils/apiError.utils");
const apiResponse_utils_1 = require("../utils/apiResponse.utils");
const auth_utils_1 = require("../utils/auth.utils");
const db_1 = require("../db/db");
const cookieJwt_utils_1 = require("../utils/cookieJwt.utils");
const userSchema = z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "phone number is required" }).email({ message: "Invalid email address" }),
    password: z.string({ required_error: "password is required" }),
});
const option = {
    httpOnly: true,
    secure: true
};
const handleUserSignIn = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = userSchema.safeParse(req.body);
        if (!userData) {
            throw new apiError_utils_1.ApiError(401, "Error in Parsing Input data");
        }
        const plainPass = req.body.password;
        const hashPass = yield (0, auth_utils_1.hashPassword)(plainPass);
        if (!hashPass) {
            throw new apiError_utils_1.ApiError(500, "password not obtained in hash");
        }
        const user = yield db_1.User.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashPass
            }
        });
        if (!user) {
            throw new apiError_utils_1.ApiError(500, "User is not created");
        }
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        const profileData = {
            userId: user.id,
            industry: "",
            streetAddress: "",
            city: "",
            state: "",
            country: "",
            zipCode: 0,
            phoneNum: "",
            websiteURL: "",
            gstNumber: "",
            certification: "",
            registrationNum: "",
            taxNum: "",
            sourceOfWater: "",
            employeName: "",
            designation: "",
            contactNum: "",
            empolyeEmail: "",
            logo: "",
        };
        const userProfile = yield db_1.Profile.create({
            data: profileData
        });
        if (!userProfile) {
            throw new apiError_utils_1.ApiError(500, "Error in creating profile");
        }
        return res
            .status(200)
            .json(new apiResponse_utils_1.ApiResponse(200, userWithoutPassword, "User is Registered Succesfully"));
    }
    catch (error) {
        throw new apiError_utils_1.ApiError(500, error.message);
    }
}));
exports.handleUserSignIn = handleUserSignIn;
const handeUserLogin = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = userSchema.safeParse(req.body);
        if (!userData) {
            throw new apiError_utils_1.ApiError(401, "Error in Parsing Input data");
        }
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const user = yield db_1.User.findUnique({
            where: {
                email: userEmail
            }
        });
        if (!user) {
            throw new apiError_utils_1.ApiError(401, "User is invalid");
        }
        ;
        const hashPass = user.password;
        const verifyPass = yield (0, auth_utils_1.checkPassword)(hashPass, userPassword);
        if (!verifyPass) {
            throw new apiError_utils_1.ApiError(401, "Password is incorrect");
        }
        (0, cookieJwt_utils_1.cookieJwt)(user, res);
        return res
            .status(200)
            .json(new apiResponse_utils_1.ApiResponse(200, user, "User is logged in"));
    }
    catch (error) {
        throw new apiError_utils_1.ApiError(500, error.message);
    }
}));
exports.handeUserLogin = handeUserLogin;
const handleUserLogout = (0, asyncHandler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new apiError_utils_1.ApiError(401, "User is not authenticated");
    }
    return res
        .status(200)
        .clearCookie("sessionId", option)
        .json(new apiResponse_utils_1.ApiResponse(200, {}, "User is loggged out succesfully"));
}));
exports.handleUserLogout = handleUserLogout;
