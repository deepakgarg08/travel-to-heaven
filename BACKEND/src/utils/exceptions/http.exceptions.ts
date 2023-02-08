class HttpException extends Error {
    public status: number;
    public error: string;

    constructor(status: number, error: string) {
        super(error);
        this.status = status;
        this.error = error;
    }
}

export default HttpException;
