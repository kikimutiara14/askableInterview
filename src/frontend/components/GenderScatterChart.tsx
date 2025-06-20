import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { ScatterChart } from '@mui/x-charts';
import { Gender, GenderData } from '../../types/analytics';

interface GenderScatterChartProps {
    data?: GenderData[Gender];
    isLoading: boolean;
    selectedGender: Gender;
}

export default function GenderScatterChart({
    data,
    isLoading,
    selectedGender,
}: GenderScatterChartProps) {
    return (
        <Box mt={20}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                Gender Data
            </Typography>
            <ScatterChart
                series={[
                    {
                        label: selectedGender,
                        data: data?.map((datum) => ({ x: datum.age, y: datum.participants })),
                    },
                ]}
                height={400}
                loading={isLoading}
                grid={{ vertical: true, horizontal: true }}
            />
        </Box>
    );
}
