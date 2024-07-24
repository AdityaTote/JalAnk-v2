"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (user) => {
    const payload = {
        userId: user.id,
        email: user.email,
    };
    const secretKey = process.env.JWT_SECRET || "poppop";
    const token = (0, jsonwebtoken_1.sign)(payload, secretKey);
    return token;
};
exports.createToken = createToken;
