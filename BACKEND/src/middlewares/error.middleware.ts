import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exceptions';

function errorMiddleware(
    err: HttpException,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    const status = err.status || 500;
    const error = err.message || 'Something went wrong';
    const success = false
    res.status(status).send({
        success,
        error,
    });
}

export default errorMiddleware;
