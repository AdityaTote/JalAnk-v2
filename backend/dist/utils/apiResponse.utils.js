"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(statuscode, data, message = "Succes") {
        this.statuscode = statuscode,
            this.data = data,
            this.message = message,
            this.Succes = statuscode < 400;
    }
}
exports.ApiResponse = ApiResponse;
