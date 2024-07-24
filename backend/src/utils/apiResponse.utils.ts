class ApiResponse{
    statuscode: number;
    data: any;
    message: string;
    Succes: any;

    constructor(
        statuscode: number,
        data: any,
        message: string = "Succes"
    ){
        this.statuscode = statuscode,
        this.data = data,
        this.message = message,
        this.Succes = statuscode < 400
    }
}

export { ApiResponse }