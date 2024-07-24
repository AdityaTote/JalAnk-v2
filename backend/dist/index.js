"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./db/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
(0, db_1.connectDB)()
    .then(() => {
    app_1.app.listen(port, () => {
        console.log(`Database Connected`);
        console.log(`Server is running on: http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.log(`Database connection failed: ${err}`);
});
