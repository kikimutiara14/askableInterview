import request from 'supertest';
import app from '../app';
import { analyticsService } from '../services/analyticsService';

const AUTH = 'Basic ' + Buffer.from('admin:password').toString('base64');

describe('AUTH testing', () => {
    it('returns data if auth is provided', async () => {
        const res = await request(app).get('/api/summary').set('Authorization', AUTH);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('totalParticipants');
    });
    it('returns 401 without auth', async () => {
        const res = await request(app).get('/api/summary');
        expect(res.status).toBe(401);
    });
});

describe('analyticsService.getSummary', () => {
    it('returns data', async () => {
        const data = await analyticsService.getSummary();
        expect(data).toBeDefined();
    });
});

describe('analyticsService.getTrends', () => {
    it('throws error if timeRange is invalid', async () => {
        // @ts-expect-error since we added a type for dimension,
        // typescript will complain if we pass an invalid value,
        // but we want to test this for negative testing
        await expect(analyticsService.getTrends({ timeRange: 'invalid' })).rejects.toThrow(
            'No trends data found for time range: invalid',
        );
    });
    it('returns trends for valid timeRange', async () => {
        const trends = await analyticsService.getTrends({ timeRange: '7d' });
        expect(trends).toBeDefined();
        expect(trends.length).toBeGreaterThan(0);
    });
    it('returns 30d trends if no timeRange is provided', async () => {
        const trends = await analyticsService.getTrends({});
        expect(trends).toBeDefined();
        expect(trends[0].data.length).toBeGreaterThan(30);
    });
});

describe('analyticsService.getComparisons', () => {
    it('throws error if dimension is invalid', async () => {
        // @ts-expect-error since we added a type for dimension,
        // typescript will complain if we pass an invalid value,
        // but we want to test this for negative testing
        await expect(analyticsService.getComparisons({ dimension: 'invalid' })).rejects.toThrow(
            'No comparisons data found for dimension: invalid',
        );
    });
    it('returns data for valid dimension', async () => {
        const comparisons = await analyticsService.getComparisons({ dimension: 'studyType' });
        expect(comparisons).toBeDefined();
        expect(comparisons.length).toBeGreaterThan(0);
    });
    it('returns age group data if no dimension is provided', async () => {
        const comparisons = await analyticsService.getComparisons({});
        expect(comparisons).toBeDefined();
        expect(comparisons.length).toBeGreaterThan(0);
    });
});

describe('analyticsService.getGenderData', () => {
    it('returns data', async () => {
        const data = await analyticsService.getGenderData();
        expect(data).toBeDefined();
    });
});
