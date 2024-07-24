import { Router } from "express";
import {
    handleUserSignIn,
    handeUserLogin,
    handleUserLogout
} from "../controller/user.controllers"
import { checkUserAuth } from "../middlewares/checkAuth.middlewares"

const userRoute = Router()

userRoute
    .route("/sign-in")
    .post(handleUserSignIn)

userRoute
    .route("/login")
    .post(handeUserLogin)

userRoute
    .route("/logout")
    .get(checkUserAuth, handleUserLogout)

export { userRoute }