import { beforeAll, describe, expect, it } from 'vitest';
import supertest from 'supertest';
import { api } from '@/api';

let server: supertest.SuperTest<supertest.Test>;

describe('[GET] /health', () => {
  beforeAll(() => {
    server = supertest(api);
  });

  it('should return ok on success request', async () => {
    const response = await server.get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});
