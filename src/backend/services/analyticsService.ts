import { readFile } from 'fs/promises';
import {
    TimeRange,
    Dimension,
    Summary,
    TrendMetric,
    ComparisonMetric,
    GenderData,
} from '../../types/analytics';
import { join } from 'path';
import mockData from '../../../data/mockData.json';

export class AnalyticsService {
    async getSummary(): Promise<Summary> {
        return mockData.summary;
    }

    async getTrends({ timeRange }: { timeRange?: TimeRange }): Promise<TrendMetric[]> {
        const trendsData = mockData.trends;
        // If no time range is provided, default to '30d' to show the whole trends data
        const filteredTrends = timeRange
            ? trendsData.timeRanges[timeRange]
            : trendsData.timeRanges['30d'];
        if (!filteredTrends) {
            throw new Error(`No trends data found for time range: ${timeRange}`);
        }
        return filteredTrends.metrics;
    }

    async getComparisons({ dimension }: { dimension?: Dimension }): Promise<ComparisonMetric[]> {
        const comparisonsData = mockData.comparisons;
        // If no dimension is provided, default to ageGroup
        const comparisons = dimension ? comparisonsData[dimension] : comparisonsData.ageGroup;
        if (!comparisons) {
            throw new Error(`No comparisons data found for dimension: ${dimension}`);
        }
        return comparisons.metrics;
    }

    async getGenderData(): Promise<GenderData> {
        return mockData.genderData;
    }
}

export const analyticsService = new AnalyticsService();
