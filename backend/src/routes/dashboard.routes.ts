import { Router } from "express";
import { checkUserAuth } from "../middlewares/checkAuth.middlewares";
import { handleDashboard } from "../controller/dashboard.controllers";

const dashRoute = Router();

dashRoute.use(checkUserAuth);

dashRoute
    .route("/:id")
    .get(handleDashboard)

export { dashRoute }