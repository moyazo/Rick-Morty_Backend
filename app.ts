"use strict"
import express, {Express, Request, Response} from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const appStart = () => {
    const app: Express = express();
    const port: string = process.env.PORT || '8000' ;

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )

    app.get('/', (resquest: Request, response: Response) => {
        response.json('Hola mundo, estamos volviendo a lio :D')
    })

    try {
        app.listen(port, () => {
            console.log(`App funcionando en el puerto ${port}`);
        })
    } catch (error) { 
        console.error("Ha habido un error al encender la APP: " + error);
        process.exit(1);
    }
};

appStart();
