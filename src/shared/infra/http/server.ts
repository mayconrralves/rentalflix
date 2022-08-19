import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';

import { AppError } from '../../errors/AppError';
import { router } from './routes';
import swaggerFile from '../../../swagger.json';

import '../typeorm';
import '../../container';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
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
app.listen(8000, () => {
    console.log('Server listen on 8000!')
});