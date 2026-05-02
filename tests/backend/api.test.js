import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../backend/index.js';

describe('API Backend Tests', () => {
    let token = '';
    const testUser = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        cpf: `${Math.floor(10000000000 + Math.random() * 90000000000)}`, // Random 11 digits
        password: 'Password123!',
        role: 'user'
    };

    describe('Auth Routes', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);
            expect(res.statusCode).toBe(201);
            expect(res.body.status).toBe('success');
            expect(res.body.user).toHaveProperty('id');
        });

        it('should login the user and return a token', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body).toHaveProperty('token');
            token = res.body.token; // Save token for protected routes
        });
    });

    describe('Transaction Routes', () => {
        it('should perform a deposit', async () => {
            const res = await request(app)
                .post('/api/transactions/deposit')
                .set('Authorization', `Bearer ${token}`)
                .send({ amount: 100 }); // $100
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
        });

        it('should fetch the balance', async () => {
            const res = await request(app)
                .get('/api/transactions/balance')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
            expect(Number(res.body.balance)).toBeGreaterThanOrEqual(100);
        });

        it('should perform a withdrawal', async () => {
            const res = await request(app)
                .post('/api/transactions/withdrawn')
                .set('Authorization', `Bearer ${token}`)
                .send({ amount: 50 }); // $50
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
        });

        it('should fail to withdraw more than the balance', async () => {
            const res = await request(app)
                .post('/api/transactions/withdrawn')
                .set('Authorization', `Bearer ${token}`)
                .send({ amount: 10000 }); // Should fail
            expect(res.statusCode).toBe(500);
            expect(res.body.err).toBe('invalid amount');
        });

        it('should fetch all transactions', async () => {
            const res = await request(app)
                .get('/api/transactions')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
            expect(Array.isArray(res.body.transactions)).toBe(true);
            expect(res.body.transactions.length).toBeGreaterThanOrEqual(2); // Deposit + Withdrawal
        });
    });
});
