"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controllers_1 = require("../controller/user.controllers");
const checkAuth_middlewares_1 = require("../middlewares/checkAuth.middlewares");
const userRoute = (0, express_1.Router)();
exports.userRoute = userRoute;
userRoute
    .route("/sign-in")
    .post(user_controllers_1.handleUserSignIn);
userRoute
    .route("/login")
    .post(user_controllers_1.handeUserLogin);
userRoute
    .route("/logout")
    .get(checkAuth_middlewares_1.checkUserAuth, user_controllers_1.handleUserLogout);
