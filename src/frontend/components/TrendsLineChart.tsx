import * as React from 'react';
import { Typography, Box, FormControl, InputLabel, Select } from '@mui/material';
import { ComparisonMetric, Dimension, TrendMetric } from '../../types/analytics';
import { LineChart } from '@mui/x-charts';

interface TrendsLineChartProps {
    data?: TrendMetric[];
}

export default function TrendsLineChart({ data }: TrendsLineChartProps) {
    // We can use the first index of data because it will always have the same dates
    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                Trends Data
            </Typography>

            <LineChart
                height={400}
                series={
                    data?.map((datum) => ({
                        data: datum.data.map((data) => data.value),
                        label: datum.name,
                    })) ?? []
                }
                xAxis={[
                    { scaleType: 'band', data: data?.[0].data.map((datum) => datum.date) ?? [] },
                ]}
                loading={!data}
            />
        </Box>
    );
}
