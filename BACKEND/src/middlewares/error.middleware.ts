import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/exceptions/http.exceptions";
import logger from "../utils/logger";

function errorMiddleware(
    err: HttpException,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    logger.info("Enter- '/middlewares/validation.middleware.ts/errorMiddleware'");

    const status = err.status || 500;
    const error = err.message || "Something went wrong";
    const success = false;

    logger.info("Exit- '/middlewares/validation.middleware.ts/errorMiddleware'");

    res.status(status).send({
        success,
        error,
    });
}

export default errorMiddleware;
