import { Router } from "express";
import { checkUserAuth } from "../middlewares/checkAuth.middlewares";
import {
    handleUserProfileCreation,
    handleUserProfileDisplay,
} from "../controller/userProfile.controllers";
import { upload } from "../middlewares/multer.middlewares";

const userProfileRoute = Router();

userProfileRoute.use(checkUserAuth)

userProfileRoute
    .route("/:id")
    .get(handleUserProfileDisplay)
    .patch(upload.single("logo"), handleUserProfileCreation)

export { userProfileRoute }