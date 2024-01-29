import { Router } from 'express';
import Health from './health';

const route = Router({ mergeParams: true });

route.get('/health', Health);

export default route;
