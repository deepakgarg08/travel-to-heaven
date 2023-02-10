import logger from "../logger";

class HttpException extends Error {
    public status: number;
    public error: string;

    constructor(status: number, error: string) {
        logger.info("Enter- 'utils/exceptions/http.exceptions.ts/HttpException'");
        super(error);
        this.status = status;
        this.error = error;
        logger.info("Exit- 'utils/exceptions/http.exceptions.ts/HttpException'");
    }
}

export default HttpException;
