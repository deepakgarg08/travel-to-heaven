import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from './controllers/controller.interface';
import ErrorMiddleware from './middlewares/error.middleware';

class App {
    public express: Application;
    public port: number;

    constructor (controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware (): void {
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initialiseControllers (controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/v1/recruiting', controller.router);
        });
    }

    private initialiseErrorHandling (): void {
        this.express.use(ErrorMiddleware);
    }

    private initialiseDatabaseConnection (): void {
    //     // const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

    //     /**
    //      * Via normal url
    //      *  */ 
    //     // const MONGO_URL =  `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        
    //     /**
    //      * in case of mongodb atlas
    //      *  */ 

    //     // const MONGO_URL: string =  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        
    //     // TO create connection with Mongo DB
    //     // mongoose
    //     //     .set('strictQuery', false)
    //     //     .connect(`${MONGO_URL}`)
    //     //     .then(() => console.log('Database Connected'))
    //     //     .catch(err => console.log(err));
    }

    public listen (): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
