"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieJwt = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const apiError_utils_1 = require("./apiError.utils");
const cookieJwt = (user, res) => {
    const option = {
        httpOnly: true,
        secure: true
    };
    const token = (0, jwt_utils_1.createToken)(user);
    if (!token) {
        throw new apiError_utils_1.ApiError(401, "User is not authenticate");
    }
    user.password = undefined;
    return res
        .status(200)
        .cookie("sessionId", token, option);
};
exports.cookieJwt = cookieJwt;
