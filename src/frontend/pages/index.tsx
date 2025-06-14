import Head from 'next/head';
import {
    Container,
    CircularProgress,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
} from '@mui/material';
import { useSummary, useComparisons, useTrends } from '../hooks/useAnalytics';
import SummaryCards from '../components/SummaryCards';
import ComparisonsBarChart from '../components/ComparisonsBarChart';
import React, { use, useEffect } from 'react';
import { Dimension, TimeRange } from '../../types/analytics';
import TrendsLineChart from '../components/TrendsLineChart';
import { useQueryClient } from '@tanstack/react-query';

export default function Dashboard() {
    const { invalidateQueries } = useQueryClient();
    const [selectedDimension, setSelectedDimension] = React.useState<Dimension>('ageGroup');
    const [selectedTimeRange, setSelectedTimeRange] = React.useState<TimeRange>('30d');
    const { data: summary, error: summaryError, refetch: refetchSummary } = useSummary();
    const {
        data: trends,
        error: trendsError,
        refetch: refetchTrends,
    } = useTrends({ timeRange: selectedTimeRange });
    const {
        data: comparisons,
        error: comparisonsError,
        refetch: refetchComparisons,
    } = useComparisons({
        dimension: selectedDimension,
    });

    return (
        <>
            <Head>
                <title>Analytics Dashboard</title>
            </Head>
            <Container maxWidth="lg" className="py-8">
                <Typography variant="h4" className="mb-4 font-bold">
                    Research Participation Dashboard
                </Typography>
                <Button
                    variant="outlined"
                    onClick={() => {
                        refetchComparisons();
                        refetchTrends();
                        refetchSummary();
                    }}
                >
                    Refresh
                </Button>
                <SummaryCards data={summary} />
                <FormControl>
                    <InputLabel id="category-label">Dimension</InputLabel>
                    <Select
                        labelId="category-label"
                        value={selectedDimension}
                        label="Dimension"
                        onChange={(e) => setSelectedDimension(e.target.value)}
                    >
                        {Array.from(dimensionKeyMap).map(([key, label]) => (
                            <MenuItem value={key} key={key}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <ComparisonsBarChart
                    data={comparisons}
                    // Adding default value here because typescript still can't deduce that the type is guaranteed to be a string
                    xAxisLabel={dimensionKeyMap.get(selectedDimension) || 'Age Group'}
                />
                <FormControl>
                    <InputLabel id="filter-label">Time Range</InputLabel>
                    <Select
                        labelId="filter-label"
                        value={selectedTimeRange}
                        label="Time Range"
                        onChange={(e) => setSelectedTimeRange(e.target.value)}
                    >
                        {Array.from(timeRangeKeyMap).map(([key, label]) => (
                            <MenuItem value={key} key={key}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TrendsLineChart data={trends} />

                {(summaryError || trendsError || comparisonsError) && (
                    <Typography color="error">Failed to load some dashboard data.</Typography>
                )}
            </Container>
        </>
    );
}

const dimensionKeyMap = new Map<Dimension, string>([
    ['ageGroup', 'Age Group'],
    ['studyType', 'Study Type'],
]);

const timeRangeKeyMap = new Map<TimeRange, string>([
    ['7d', '7 Days'],
    ['14d', '14 Days'],
    ['30d', '30 Days'],
]);
