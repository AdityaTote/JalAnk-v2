"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRoute = void 0;
const express_1 = require("express");
const checkAuth_middlewares_1 = require("../middlewares/checkAuth.middlewares");
const userProfile_controllers_1 = require("../controller/userProfile.controllers");
const multer_middlewares_1 = require("../middlewares/multer.middlewares");
const userProfileRoute = (0, express_1.Router)();
exports.userProfileRoute = userProfileRoute;
userProfileRoute
    .route("/:id")
    .get(checkAuth_middlewares_1.checkUserAuth, userProfile_controllers_1.handleUserProfileDisplay)
    .patch(checkAuth_middlewares_1.checkUserAuth, multer_middlewares_1.upload.single("logo"), userProfile_controllers_1.handleUserProfileCreation);
