import { verify, JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/apiError.utils";
import { User } from "../db/db";

const checkUserAuth = async(req: any, res: any, next: any) => {

    const token: string = req.cookies?.sessionId;

    if(!token){
        throw new ApiError(
            401,
            "Unauthorize User"
        )
    }

    const secretKey: string = process.env.JWT_SECRET || "poppop";

    const verifiedToken = verify(token, secretKey) as JwtPayload

    if(!verifiedToken){
        throw new ApiError(
            500,
            "Invalid Token"
        )
    };
    
    const user = await User.findUnique({
        where: {
            id: verifiedToken.userId
        }
    });

    req.user = user;

    next()
}

export { checkUserAuth }