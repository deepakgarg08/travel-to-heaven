import { RequestHandler, Request, Response, NextFunction } from "express";
import Joi from "joi";
import logger from "../utils/logger";

// to validate mongodb schema
function validationMiddleware(schema: Joi.Schema): RequestHandler {
    logger.info("Enter- '/middlewares/validation.middleware.ts/validationMiddleware'");
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };
        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        } catch (error: any) {
            logger.error(
                "Exit- '/middlewares/validation.middleware.ts/validationMiddleware'",
                error
            );
            const errors: string[] = [];
            error.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({ errors: errors });
        }
        logger.info("Exit- '/middlewares/validation.middleware.ts/validationMiddleware'");
    };
}

export default validationMiddleware;
