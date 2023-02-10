import { Router, Request, Response, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";
import HttpException from "../utils/exceptions/http.exceptions";
import HotelService from "../services/hotels/hotel.service";
import logger from "../utils/logger";
/**
 * these import can be used to validate the monogoose schema
 * import validationMiddleware from "../../middlewares/validation.middleware";
 *
 * import validate from './hotel.validation';
 *
 */

class HotelController implements Controller {
    public path = "/hotels?/?:hotelId";
    public router = Router();
    private HotelService = new HotelService();

    constructor() {
        logger.info(
            "Enter- '/controller/hotel.controller.ts/HotelController/constructor'"
        );
        this.initialiseRoutes();
        logger.info(
            "Exit- '/controller/hotel.controller.ts/HotelController/constructor'"
        );
    }
    private initialiseRoutes(): void {
        logger.info(
            "Enter- '/controller/hotel.controller.ts/HotelController/initialiseRoutes'"
        );
        this.router.get(
            `${this.path}`,
            // validationMiddleware(validate.create),
            this.getHotelsList
        );
        logger.info(
            "Exit- '/controller/hotel.controller.ts/HotelController/initialiseRoutes'"
        );
    }
    private getHotelsList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        logger.info(
            "Enter- '/controller/hotel.controller.ts/HotelController/getHotelsList'"
        );
        try {
            const hotelId = Number(req.params.hotelId);
            const lang = (req.query as { lang: string }).lang;
            const search = (req.query as { search: string }).search;

            const requestParams = {
                hotelId,
                lang,
                search,
            };
            const result = await this.HotelService.getHotels(requestParams);
            logger.info(
                "Exit- '/controller/hotel.controller.ts/HotelController/getHotelsList'"
            );
            res.status(200).json(result);
        } catch (error: any) {
            logger.error(
                "Exit- '/controller/hotel.controller.ts/HotelController/getHotelsList'"
            );
            next(new HttpException(400, error.message));
        }
    };
}

export default HotelController;
