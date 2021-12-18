import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import mongoose from 'mongoose';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import logger from '@shared/Logger';

// Import de routers
import userRouter from '@routes/user.router';

const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
// Middlewares -> Funcion o funcionalidad extra que se ejecuta antes de una peticion
// o que sirve como codigo adicional de las depdencias del proyecto
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Conectar a mongodb a traves de mongoose
mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
    logger.info('Conectado a base de datos')
})
.catch((err) => {
    logger.err(err);
});

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
// localhost:PUERTO/api
// app.use('/api', BaseRouter);
app.use('/api', userRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;
