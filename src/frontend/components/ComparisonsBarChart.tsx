import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box } from '@mui/material';
import { ComparisonMetric } from '../../types/analytics';

interface ComparisonBarChartProps {
    data?: ComparisonMetric[];
    xAxisLabel: string;
    isLoading: boolean;
}

export default function ComparisonBarChart({
    data,
    xAxisLabel,
    isLoading,
}: ComparisonBarChartProps) {
    return (
        <Box mt={20}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                Comparison Data
            </Typography>
            <BarChart
                xAxis={[
                    {
                        id: 'comparison',
                        data: data?.map((datum) => datum.name) ?? [],
                        scaleType: 'band',
                        label: xAxisLabel,
                    },
                ]}
                series={[
                    { data: data?.map((datum) => datum.applications) ?? [], label: 'Applications' },
                    { data: data?.map((datum) => datum.completions) ?? [], label: 'Completions' },
                ]}
                height={400}
                grid={{ horizontal: true }}
                loading={isLoading}
            />
        </Box>
    );
}
