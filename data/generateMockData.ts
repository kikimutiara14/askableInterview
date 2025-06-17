import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { Gender, GenderData } from '../src/types/analytics';

// Define study types
const STUDY_TYPES = [
    'Clinical Trials',
    'Surveys',
    'Focus Groups',
    'Longitudinal Studies',
    'Interviews',
    'Observational Studies',
];

// Generate dates for the past 30 days
const generateDatesForPastDays = (days: number) => {
    const dates = [];
    for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
};

const dates = generateDatesForPastDays(30);

// Generate summary metrics
export const generateSummaryMetrics = () => {
    const totalParticipants = faker.number.int({ min: 10000, max: 15000 });
    const activeParticipants = faker.number.int({
        min: 3000,
        max: totalParticipants,
    });
    const totalStudies = faker.number.int({ min: 40, max: 60 });
    const activeStudies = faker.number.int({ min: 15, max: totalStudies });

    return {
        totalParticipants,
        activeParticipants,
        totalStudies,
        activeStudies,
        averageEligibilityRate: faker.number.float({
            min: 25,
            max: 45,
            multipleOf: 0.1,
        }),
        completionRate: faker.number.float({ min: 60, max: 80, multipleOf: 0.1 }),
    };
};

// Generate trend data for different metrics
export const generateTrendData = () => {
    const metrics = [
        {
            name: 'Study Applications',
            data: dates.map((date) => ({
                date,
                value: faker.number.int({ min: 150, max: 450 }),
            })),
        },
        {
            name: 'Study Completions',
            data: dates.map((date) => ({
                date,
                value: faker.number.int({ min: 100, max: 300 }),
            })),
        },
        {
            name: 'New Participants',
            data: dates.map((date) => ({
                date,
                value: faker.number.int({ min: 50, max: 150 }),
            })),
        },
    ];

    // Create time range data for 7d, 14d, 30d
    return {
        timeRanges: {
            '7d': {
                interval: 'day',
                metrics: metrics.map((metric) => ({
                    name: metric.name,
                    data: metric.data.slice(-7),
                })),
            },
            '14d': {
                interval: 'day',
                metrics: metrics.map((metric) => ({
                    name: metric.name,
                    data: metric.data.slice(-14),
                })),
            },
            '30d': {
                interval: 'day',
                metrics,
            },
        },
    };
};

// Generate comparison data across different dimensions
export const generateComparisonData = () => {
    // Study type comparison
    const studyTypeComparison = {
        dimension: 'studyType',
        metrics: STUDY_TYPES.map((type) => ({
            name: type,
            applications: faker.number.int({ min: 500, max: 4000 }),
            completions: faker.number.int({ min: 150, max: 3000 }),
        })),
    };

    // Generate other comparison dimensions
    const ageGroupComparison = {
        dimension: 'ageGroup',
        metrics: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'].map((group) => ({
            name: group,
            applications: faker.number.int({ min: 300, max: 4000 }),
            completions: faker.number.int({ min: 80, max: 3000 }),
        })),
    };

    return {
        studyType: studyTypeComparison,
        ageGroup: ageGroupComparison,
    };
};

export const generateGenderData = () => {
    const genders: Gender[] = ['F', 'M'];
    const totalData = faker.number.int({ min: 40, max: 60 });
    const genderDataF = [];
    const genderDataM = [];
    for (let i = 0; i < totalData; i++) {
        genderDataF.push({
            age: faker.number.int({ min: 18, max: 70 }),
            participants: faker.number.int({ min: 300, max: 4000 }),
        });
        genderDataM.push({
            age: faker.number.int({ min: 18, max: 70 }),
            participants: faker.number.int({ min: 300, max: 4000 }),
        });
    }
    return {
        F: genderDataF,
        M: genderDataM,
    };
};

// Combine all the data
const mockData = {
    summary: generateSummaryMetrics(),
    trends: generateTrendData(),
    comparisons: generateComparisonData(),
    genderData: generateGenderData(),
};

fs.writeFileSync(path.join(__dirname, 'mockData.json'), JSON.stringify(mockData, null, 2));

console.log('Mock data generated successfully!');
