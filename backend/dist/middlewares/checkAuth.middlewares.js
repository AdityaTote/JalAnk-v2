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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const apiError_utils_1 = require("../utils/apiError.utils");
const db_1 = require("../db/db");
const checkUserAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.sessionId;
    if (!token) {
        throw new apiError_utils_1.ApiError(401, "Unauthorize User");
    }
    const secretKey = process.env.JWT_SECRET || "poppop";
    const verifiedToken = (0, jsonwebtoken_1.verify)(token, secretKey);
    if (!verifiedToken) {
        throw new apiError_utils_1.ApiError(500, "Invalid Token");
    }
    ;
    const user = yield db_1.User.findUnique({
        where: {
            id: verifiedToken.userId
        }
    });
    req.user = user;
    next();
});
exports.checkUserAuth = checkUserAuth;
