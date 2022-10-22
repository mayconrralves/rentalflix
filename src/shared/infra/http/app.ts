import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

import { AppError } from '../../errors/AppError';
import { router } from './routes';
import swaggerFile from '../../../swagger.json';

import createConnection from '../typeorm';
import '../../container';
import upload from '../../../config/upload';

createConnection();
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use(cors());
app.use(router);
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.codeStatus).json({
                message: err.message,
            });
        }
        return response.status(500).json({
            status: 'error',
            message: `Internal server error - ${err.message}`,
        });
    }
);

export { app };
