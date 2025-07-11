import { useQuery } from '@tanstack/react-query';
import {
    Summary,
    TrendMetric,
    ComparisonMetric,
    TimeRange,
    Dimension,
    GenderData,
    Gender,
} from '../../types/analytics';
import { apiClient } from '../utils/apiClient';

export function useSummary() {
    return useQuery<Summary>({
        queryKey: ['summary'],
        queryFn: () => apiClient<Summary>('http://localhost:4000/api/summary'),
    });
}

export function useTrends({ timeRange }: { timeRange?: TimeRange }) {
    return useQuery<TrendMetric[]>({
        queryKey: ['trends', { timeRange }],
        queryFn: () =>
            apiClient<TrendMetric[]>('http://localhost:4000/api/trends', {
                timeRange,
            }),
    });
}

export function useComparisons({ dimension }: { dimension?: Dimension }) {
    return useQuery<ComparisonMetric[]>({
        queryKey: ['comparisons', { dimension }],
        queryFn: () =>
            apiClient<ComparisonMetric[]>('http://localhost:4000/api/comparisons', {
                dimension,
            }),
    });
}

export function useGenderData({ gender }: { gender?: Gender }) {
    return useQuery<GenderData[Gender]>({
        queryKey: ['genderData', gender],
        queryFn: () =>
            apiClient<GenderData[Gender]>('http://localhost:4000/api/genders', {
                gender,
            }),
    });
}
