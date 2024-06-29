const request = require('supertest');
const app = require("../index"); 

describe('Drone API', () => {
    it('should register a new drone', async () => {
        const res = (await request(app).post('/api/drones')).send({
            serialNumber: 'DR123456789',
            model: 'Lightweight',
            weightLimit: 400,
            batteryCapacity: 100,
            state: 'IDLE'
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    })
})