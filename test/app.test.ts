import request from 'supertest';
import { App } from '../src/app';

describe('Express App', () => {
  const app = new App().getApp();

  it('responds with "Hello, World!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Hello, World!');
  });
});
