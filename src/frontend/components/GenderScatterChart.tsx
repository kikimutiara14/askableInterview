import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { ScatterChart } from '@mui/x-charts';
import { GenderData } from '../../types/analytics';

interface GenderScatterChartProps {
    data?: GenderData;
}

export default function GenderScatterChart({ data }: GenderScatterChartProps) {
    return (
        <Box>
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
                margin={{ top: 30, right: 30, left: 40, bottom: 40 }}
                loading={!data}
                grid={{ vertical: true, horizontal: true }}
            />
        </Box>
    );
}
