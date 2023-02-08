import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';
import HotelController from "./resources/hotels/hotel.controller";

validateEnv();

const app = new App([new HotelController()], Number(process.env.PORT));
app.listen();
