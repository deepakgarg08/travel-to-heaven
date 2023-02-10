import express, { Application } from "express";
// import mongoose from 'mongoose';
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import Controller from "./interfaces/controller.interface";
import ErrorMiddleware from "./middlewares/error.middleware";
import logger from "./utils/logger";
class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        logger.info("Enter- 'app.ts/Constructor'");

        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();

        logger.info("Exit- 'app.ts/Constructor'");
    }

    private initialiseMiddleware(): void {
        logger.info("Enter- 'app.ts/initialiseMiddleware'");

        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        logger.info("Exit- 'app.ts/initialiseMiddleware'");
    }

    private initialiseControllers(controllers: Controller[]): void {
        logger.info("Enter- 'app.ts/initialiseControllers'");
        controllers.forEach((controller: Controller) => {
            this.express.use("/v1/recruiting", controller.router);
        });
        logger.info("Exit- 'app.ts/initialiseControllers'");
    }

    private initialiseErrorHandling(): void {
        logger.info("Enter- 'app.ts/initialiseErrorHandling'");
        this.express.use(ErrorMiddleware);
        logger.info("Exit- 'app.ts/initialiseErrorHandling'");
    }

    private initialiseDatabaseConnection(): void {
        //  logger.info("Enter- 'app.ts/initialiseDatabaseConnection'")
        // const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        /**
         * Via normal url
         *  */
        // const MONGO_URL =  `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        /**
         * in case of mongodb atlas
         *  */
        // const MONGO_URL: string =  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        // TO create connection with Mongo DB
        // mongoose
        //     .set('strictQuery', false)
        //     .connect(`${MONGO_URL}`)
        //     .then(() => console.log('Database Connected'))
        //     .catch(err => console.log(err));
        // logger.info("Exit- 'app.ts/initialiseDatabaseConnection'")
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
