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
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                    <CircularProgress />
                </div>
            ) : (
                <Grid container spacing={2} direction={{ xs: 'column', md: 'row' }}>
                    {summaryKeys.map((item) => (
                        <Grid key={item} width={'auto'}>
                            <Card
                                sx={{
                                    backgroundColor: '#fb5153',
                                    width: { xs: '100%', md: 250 },
                                    height: 150,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardContent
                                    sx={{ width: { xs: '100%', md: 250 }, textAlign: 'center' }}
                                >
                                    <Typography variant="h6" color="text.secondary" gutterBottom>
                                        {summaryKeyMap.get(item)}
                                    </Typography>
                                    <Typography variant="h4" color="text.primary">
                                        {['averageEligibilityRate', 'completionRate'].includes(item)
                                            ? data[item] + '%'
                                            : data[item]}
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

const summaryKeyMap = new Map<keyof Summary, string>([
    ['totalParticipants', 'Total Participants'],
    ['activeParticipants', 'Active Participants'],
    ['totalStudies', 'Total Studies'],
    ['activeStudies', 'Active Studies'],
    ['averageEligibilityRate', 'Average Eligibility Rate'],
    ['completionRate', 'Completion Rate'],
]);
