import request from 'supertest';
import {describe, expect} from '@jest/globals';
import { app, server } from '../src/index';

describe('URL Shortener API', () => {
    it('should create a short URL', async () => {
        const response = await request(app)
            .post('/shorten')
            .send({ fullUrl: 'https://profi.ru/' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('alias');
        expect(response.body).toHaveProperty('fullUrl');
    });

    it('should handle custom aliases', async () => {
        const response = await request(app)
            .post('/shorten')
            .send({ fullUrl: 'https://profi.ru/', customAlias: 'profi' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('alias', 'profi');
        expect(response.body).toHaveProperty('fullUrl', 'https://profi.ru/');
    });

    it('should handle invalid URLs', async () => {
        const response = await request(app)
            .post('/shorten')
            .send({ fullUrl: 'invalid-url' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid URL');
    });

    it('should handle duplicate custom aliases', async () => {
        await request(app)
            .post('/shorten')
            .send({ fullUrl: 'https://linkedin.com', customAlias: 'linkedIn' });

        const response = await request(app)
            .post('/shorten')
            .send({ fullUrl: 'https://www.linkedin.com/in/aleksandr-saburov-725571288/', customAlias: 'linkedIn' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Alias already in use');
    });

    afterAll(done => {
        server.close(done);
    });
});
