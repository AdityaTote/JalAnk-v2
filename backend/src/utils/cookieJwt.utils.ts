import { createToken } from "../utils/jwt.utils";
import { ApiError } from "./apiError.utils";

const cookieJwt = (user: any, res: any) => {

    const option = {
        httpOnly: true,
        secure: true
    };

    const token = createToken(user);

    if(!token){
        throw new ApiError(
            401,
            "User is not authenticate"
        )
    }

    user.password = undefined;

    return res
            .status(200)
            .cookie("sessionId", token, option)

}

export { cookieJwt }