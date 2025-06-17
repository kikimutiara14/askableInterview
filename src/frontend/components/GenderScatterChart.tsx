import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { ScatterChart } from '@mui/x-charts';
import { GenderData } from '../../types/analytics';

interface GenderScatterChartProps {
    data?: GenderData;
    isLoading: boolean;
}

export default function GenderScatterChart({ data, isLoading }: GenderScatterChartProps) {
    return (
        <Box mt={20}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                Gender Data
            </Typography>
            <ScatterChart
                series={[
                    {
                        label: 'F',
                        data: data?.F.map((datum) => ({ x: datum.age, y: datum.participants })),
                    },
                    {
                        label: 'M',
                        data: data?.M.map((datum) => ({ x: datum.age, y: datum.participants })),
                    },
                ]}
                height={400}
                loading={isLoading}
                grid={{ vertical: true, horizontal: true }}
            />
        </Box>
    );
}
