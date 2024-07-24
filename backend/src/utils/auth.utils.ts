import * as argon2 from "argon2";
import { ApiError } from "./apiError.utils";

const hashPassword = async (password: string) => {
    try {
        const hashpass: string = await argon2.hash(password);
        return hashpass
    } catch (error: any) {
        throw new ApiError(500, error.message) 
    }
};

const checkPassword = async (hashPass: string, password: string) => {
    try {
        const verifyPass: boolean = await argon2.verify(hashPass, password);
        return verifyPass
    } catch (error: any) {
        throw new ApiError(500, error.message) 
    }
};

export {
    hashPassword,
    checkPassword
}