import { env } from '@/env';

export const isProdEnv = env.NODE_ENV !== 'prod';
