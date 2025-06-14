import { readFile } from 'fs/promises';
import {
    TimeRange,
    Dimension,
    Summary,
    TrendMetric,
    ComparisonMetric,
    RegionalData,
} from '../../types/analytics';
import { join } from 'path';

export class AnalyticsService {
    async getGeneratedData() {
        const filePath = join('public/mockData.json');
        const response = await readFile(filePath, 'utf-8');
        return JSON.parse(response);
    }

    async getSummary(): Promise<Summary> {
        const data = await this.getGeneratedData();
        return data.summary;
    }

    async getTrends({ timeRange }: { timeRange?: TimeRange }): Promise<TrendMetric[]> {
        const data = await this.getGeneratedData();
        const trendsData = data.trends;
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
        const data = await this.getGeneratedData();
        const comparisonsData = data.comparisons;
        // If no dimension is provided, default to ageGroup
        const comparisons = dimension ? comparisonsData[dimension] : comparisonsData.ageGroup;
        if (!comparisons) {
            throw new Error(`No comparisons data found for dimension: ${dimension}`);
        }
        return comparisons.metrics;
    }

    async getRegionalData(): Promise<RegionalData> {
        const data = await this.getGeneratedData();
        return data.regionalData;
    }
}

export const analyticsService = new AnalyticsService();
