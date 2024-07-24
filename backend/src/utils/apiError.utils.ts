class ApiError extends Error {
    statuscode: number;
    message: string;
    success: boolean;
    error: any[];

    constructor(
        statuscode: number,
        message = "Something went wrong",
        error = [],
        stack: string = ""
    ){
        super(message)
        this.statuscode = statuscode,
        this.message = message,
        this.success = false,
        this.error = error;
        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this , this.constructor)
        }
    }
}

export { ApiError }