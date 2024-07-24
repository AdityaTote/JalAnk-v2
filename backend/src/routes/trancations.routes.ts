import { Router } from "express";
import { checkUserAuth } from "../middlewares/checkAuth.middlewares"
import { handleTransactionCreation, handleTransactionDisplay } from "../controller/transac.controllers";

const transRoute = Router();

transRoute.use(checkUserAuth);

transRoute
    .route("/")
    .post(handleTransactionCreation)
    .get(handleTransactionDisplay)

export {
    transRoute
}