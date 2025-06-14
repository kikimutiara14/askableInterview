import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Summary } from '../../types/analytics';
import { CircularProgress } from '@mui/material';

interface SummaryCardsProps {
    data?: Summary;
}

export default function SummaryCards({ data }: SummaryCardsProps) {
    const summaryKeys = Object.keys(data ?? {}) as (keyof Summary)[];
    return (
        <>
            {!data ? (
                <div className="flex justify-center my-8">
                    <CircularProgress />
                </div>
            ) : (
                <Grid container spacing={2} direction={'row'}>
                    {summaryKeys.map((item) => (
                        <Grid key={item}>
                            <Card
                                sx={{
                                    backgroundColor: '#fb5153',
                                    width: 250,
                                    height: 250,
                                    fontSize: 14,
                                    alignContent: 'center',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" color="text.secondary" gutterBottom>
                                        {item}
                                    </Typography>
                                    <Typography variant="h4" color="text.primary">
                                        {data[item]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}
