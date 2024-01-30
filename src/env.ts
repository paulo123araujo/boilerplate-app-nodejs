import process from 'node:process';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3333),
  TZ: z.string().default('America/Sao_Paulo'),
  DATABASE_TYPE: z.string().default('postgres'),
  DATABASE_HOST: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_NAME: z.string(),
  CI: z.coerce.boolean().default(false),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv.success === false) {
  console.error('Invalid environment variables', parsedEnv.error.format());

  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
