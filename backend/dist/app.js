"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const logger_utils_1 = __importDefault(require("./utils/logger.utils"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
const morganFormat = ':method :url :status :response-time ms';
// Middlewares
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3],
            };
            logger_utils_1.default.info(JSON.stringify(logObject));
        }
    }
}));
// Routes
const user_routes_1 = require("./routes/user.routes");
const userProfile_routes_1 = require("./routes/userProfile.routes");
app.use("/api/v1/users", user_routes_1.userRoute);
app.use("/api/v1/user-profile", userProfile_routes_1.userProfileRoute);
