import express from "express";
import logger from './utils/logger.utils';
import morgan from 'morgan';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();
const morganFormat = ':method :url :status :response-time ms';

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({
  origin: ["http:localhost:3000", "http:localhost:5432", "http:localhost:5473"]
}))
app.use(morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      }
    }
}));

// Routes
import { userRoute } from "./routes/user.routes"
import { userProfileRoute } from "./routes/userProfile.routes"
import { dashRoute } from "./routes/dashboard.routes";
import { transRoute } from "./routes/trancations.routes";

app.use("/api/v1/users", userRoute);
app.use("/api/v1/user-profile", userProfileRoute);
app.use("/api/v1/dashboard", dashRoute);
app.use("/api/v1/transaction", transRoute);

export { app }