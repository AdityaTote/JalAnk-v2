import { app } from "./app";
import { connectDB } from "./db/db";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Database Connected`);
            console.log(`Server is running on: http://localhost:${port}`);
        })
    })
    .catch((err) => {
        console.log(`Database connection failed: ${err}`);
    })