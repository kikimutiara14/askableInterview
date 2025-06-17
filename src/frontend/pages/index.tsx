import Head from 'next/head';
import {
    Container,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Box,
} from '@mui/material';
import { useSummary, useComparisons, useTrends, useGenderData } from '../hooks/useAnalytics';
import SummaryCards from '../components/SummaryCards';
import ComparisonsBarChart from '../components/ComparisonsBarChart';
import React from 'react';
import { Dimension, TimeRange } from '../../types/analytics';
import TrendsLineChart from '../components/TrendsLineChart';
import GenderScatterChart from '../components/GenderScatterChart';

export default function Dashboard() {
    const [selectedDimension, setSelectedDimension] = React.useState<Dimension>('ageGroup');
    const [selectedTimeRange, setSelectedTimeRange] = React.useState<TimeRange>('30d');
    const {
        data: summary,
        error: summaryError,
        refetch: refetchSummary,
        isLoading: isSummaryLoading,
        isFetching: isSummaryFetching,
    } = useSummary();
    const {
        data: trends,
        error: trendsError,
        refetch: refetchTrends,
        isLoading: isTrendsLoading,
        isFetching: isTrendsFetching,
    } = useTrends({ timeRange: selectedTimeRange });
    const {
        data: comparisons,
        error: comparisonsError,
        refetch: refetchComparisons,
        isLoading: isComparisonsLoading,
        isFetching: isComparisonsFetching,
    } = useComparisons({
        dimension: selectedDimension,
    });
    const {
        data: genderData,
        error: genderDataError,
        refetch: refetchGenderData,
        isLoading: isGenderDataLoading,
        isFetching: isGenderDataFetching,
    } = useGenderData();

    return (
        <>
            <Head>
                <title>Analytics Dashboard</title>
            </Head>
            <Container maxWidth="lg" className="py-8">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={2}
                    position={'sticky'}
                    top={0}
                    zIndex={100}
                    bgcolor="background.paper"
                    paddingTop={2}
                >
                    <Typography variant="h4" className="mb-4 font-bold">
                        Research Participation Dashboard
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => {
                            refetchComparisons();
                            refetchTrends();
                            refetchSummary();
                            refetchGenderData();
                        }}
                        sx={{ height: 50, alignSelf: 'center' }}
                    >
                        Refresh
                    </Button>
                </Box>
                <SummaryCards data={summary} isLoading={isSummaryLoading || isSummaryFetching} />
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    mb={2}
                    justifyContent={'space-between'}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                >
                    <Box flex={1}>
                        <ComparisonsBarChart
                            data={comparisons}
                            // Adding default value here because typescript still can't deduce that the type is guaranteed to be a string
                            xAxisLabel={dimensionKeyMap.get(selectedDimension) || 'Age Group'}
                            isLoading={isComparisonsLoading || isComparisonsFetching}
                        />
                    </Box>
                    <FormControl>
                        <InputLabel id="category-label">Dimension</InputLabel>
                        <Select
                            labelId="category-label"
                            value={selectedDimension}
                            label="Dimension"
                            onChange={(e) => setSelectedDimension(e.target.value as Dimension)}
                        >
                            {Array.from(dimensionKeyMap).map(([key, label]) => (
                                <MenuItem value={key} key={key}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    mb={2}
                    justifyContent={'space-between'}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                >
                    <Box flex={1}>
                        <TrendsLineChart
                            data={trends}
                            isLoading={isTrendsLoading || isTrendsFetching}
                        />
                    </Box>
                    <FormControl>
                        <InputLabel id="filter-label">Time Range</InputLabel>
                        <Select
                            labelId="filter-label"
                            value={selectedTimeRange}
                            label="Time Range"
                            onChange={(e) => setSelectedTimeRange(e.target.value as TimeRange)}
                        >
                            {Array.from(timeRangeKeyMap).map(([key, label]) => (
                                <MenuItem value={key} key={key}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <GenderScatterChart
                    data={genderData}
                    isLoading={isGenderDataLoading || isGenderDataFetching}
                />

                {(summaryError || trendsError || comparisonsError || genderDataError) && (
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
