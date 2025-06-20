import { Router } from 'express';
import { analyticsService } from '../services/analyticsService';
import { TimeRange, Dimension, Gender } from '../../types/analytics';
import { Request, Response, NextFunction } from 'express';

// All routes assume /api prefix from main app
export const analyticsRouter = Router();

analyticsRouter.get('/summary', async (req, res, next) => {
    try {
        const data = await analyticsService.getSummary();
        res.json(data);
    } catch (err) {
        next(err);
    }
});

analyticsRouter.get(
    '/trends',
    async (
        req: Request<{}, {}, {}, { timeRange?: TimeRange }>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { timeRange } = req.query;
            const data = await analyticsService.getTrends({ timeRange });
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
);

analyticsRouter.get(
    '/comparisons',
    async (
        req: Request<{}, {}, {}, { dimension?: Dimension }>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { dimension } = req.query;
            const data = await analyticsService.getComparisons({ dimension });
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
);

analyticsRouter.get(
    '/genders',
    async (req: Request<{}, {}, {}, { gender?: Gender }>, res: Response, next: NextFunction) => {
        try {
            const { gender } = req.query;
            const data = await analyticsService.getGenderData({ gender });
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
);
