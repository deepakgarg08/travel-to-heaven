import { Router, Request, Response, NextFunction } from "express";
import Controller from "./controller.interface";
import HttpException from "../utils/exceptions/http.exceptions";
import HotelService from "../services/hotels/hotel.service";

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
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}`,
            // validationMiddleware(validate.create),
            this.getHotelsList
        );
    }
    private getHotelsList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
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
            res.status(200).json(result);
        } catch (error: any) {
            next(new HttpException (400, error.message));
        }
    };
}

export default HotelController;
