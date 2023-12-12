import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const api = express();

api.use(cors());
api.use(helmet());

// api.use(routes);

export { api };
