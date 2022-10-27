import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

import { AppError } from '../../errors/AppError';
import { router } from './routes';
import swaggerFile from '../../../swagger.json';

import createConnection from '../typeorm';
import upload from '../../../config/upload';
import rateLimiter from './middlewares/rateLimiter';
import '../../container';

createConnection();
const app = express();

app.use(rateLimiter);

app.use(express.json());
Sentry.init({
    dsn: 'https://24a8e5df3e3145e0869e0e39b286ea59@o4504055480909824.ingest.sentry.io/4504055489363968',
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());
console.log(process.env.SENTRY_DSN);
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
