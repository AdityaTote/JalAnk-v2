import { sign } from "jsonwebtoken";

const createToken = (user: any) => {

    const payload = {
        userId: user.id,
        email: user.email,
        name:user.name,
    }

    const secretKey: string = process.env.JWT_SECRET || "poppop";

    const token = sign(payload, secretKey)

    return token

}

export { createToken }