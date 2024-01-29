import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler, loggerMiddleware } from './middlewares';

const api = express();

api.use(cors({ origin: '*' }));
api.use(helmet());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(loggerMiddleware);

api.use(routes);

api.use(errorHandler);

export { api };
