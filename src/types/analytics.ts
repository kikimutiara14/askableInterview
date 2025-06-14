export type TimeRange = '7d' | '14d' | '30d';
export type Dimension = 'ageGroup' | 'studyType';
export type Region = 'ACT' | 'NSW' | 'NT' | 'QLD' | 'SA' | 'TAS' | 'VIC' | 'WA';

export interface Summary {
    totalParticipants: number;
    activeParticipants: number;
    totalStudies: number;
    activeStudies: number;
    averageEligibilityRate: number;
    completionRate: number;
}

export interface TrendMetric {
    name: string;
    data: { date: string; value: number }[];
}

export type Trends = {
    [timeRange in TimeRange]: {
        interval: string;
        metrics: TrendMetric[];
    };
};

export interface ComparisonMetric {
    name: string;
    applications: number;
    completions: number;
}

export interface Comparisons {
    [category: string]: {
        dimension: Dimension;
        metrics: ComparisonMetric[];
    };
}

export type RegionalData = {
    [region in Region]: number;
};
