import summaryData from '../../data/summary.json';
import comparisonsData from '../../data/comparisons.json';
import trendsData from '../../data/trends.json';
import {
    TimeRange,
    Dimension,
    Summary,
    Trends,
    TrendMetric,
    ComparisonMetric,
} from '../types/analytics';
import { log, time } from 'console';

export class AnalyticsService {
    async getSummary(): Promise<Summary> {
        return summaryData;
    }

    async getTrends({ timeRange }: { timeRange?: TimeRange }): Promise<TrendMetric[]> {
        const trends = trendsData.timeRanges;
        if (!timeRange) {
            return Object.values(trends).flatMap((trends) => trends.metrics);
        }
        // Filter trends based on the provided time range
        const filteredTrends = trends[timeRange];
        if (!filteredTrends) {
            throw new Error(`No trends data found for time range: ${timeRange}`);
        }
        return filteredTrends.metrics;
    }

    async getComparisons({ dimension }: { dimension?: Dimension }): Promise<ComparisonMetric[]> {
        // If no dimension is provided, default to ageGroup
        const comparisons = dimension ? comparisonsData[dimension] : comparisonsData.ageGroup;
        if (!comparisons) {
            throw new Error(`No comparisons data found for dimension: ${dimension}`);
        }
        return comparisons.metrics;
    }
}

export const analyticsService = new AnalyticsService();
