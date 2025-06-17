# Analytics Dashboard Technical Test

## Overview

This technical test involves building an analytics dashboard application for a research participation platform. The dashboard will help researchers and administrators visualize and analyze how participants engage with various research studies.

You'll be creating visualizations and metrics that track study participation rates, eligibility screening outcomes, completion rates, and demographic distributions across different research studies and time periods. The goal is to demonstrate your skills in frontend development with some backend integration.

## Requirements

### Frontend

- Create a responsive dashboard UI with at least 3 different visualization components (charts, graphs, etc.)
- Implement filters to allow users to view data by different dimensions (time periods, categories, etc.)
- Add data refresh functionality (polling or manual refresh)
- Use React and its ecosystem
- Create clean, maintainable code with appropriate component structure
- Implement responsive design that works well on different screen sizes

### Backend

- Create RESTful API endpoints to serve dashboard data
- Use Node and its ecosystem
- Implement data transformation/aggregation logic
- Add basic authentication for API access
- Include appropriate error handling

**Implement tests or if time is tight, explain how you would implement testing and why**

## Technical Specifications

### Dashboard Requirements

- The dashboard should include at least these visualization types:
    - Line chart (showing research participation trends over time)
    - Bar chart (comparing metrics across study types or demographics)
    - Summary cards/KPI indicators (showing key participation metrics)
    - At least one additional visualization of your choice
- Users should be able to filter data by:
    - Time range (e.g., last 7 days, 14 days, 30 days)
    - Study type (e.g., Clinical Trials, Surveys, Focus Groups)
    - Additional filters of your choice (age groups, regions, etc.)
- Include a data refresh mechanism
- Provide visual feedback during data loading
- Implement a responsive design that works well on different screen sizes

### API Requirements

Design and implement a set of RESTful API endpoints that provide:

- Summary metrics for research participation (participant counts, completion rates, etc.)
- Time-series data for tracking trends over different time periods
- Comparative data across different dimensions (study types, regions, demographics, etc.)

Your API should:

- Include appropriate query parameters for filtering data
- Handle errors gracefully with appropriate status codes and messages
- Follow RESTful design principles

### Data Structure

The application will work with research participation analytics data. Below are simplified examples of the data structure:

```json
// Example response for summary metrics
{
  "totalParticipants": 12500,
  "activeParticipants": 4200,
  "totalStudies": 48,
  "activeStudies": 18,
  "averageEligibilityRate": 32.5,
  "completionRate": 68.7
}

// Example response for trend data
{
  "timeRange": "7d",
  "interval": "day",
  "metrics": [
    {
      "name": "Study Applications",
      "data": [
        { "date": "2025-05-14", "value": 250 },
        { "date": "2025-05-15", "value": 280 },
        { "date": "2025-05-16", "value": 340 },
        { "date": "2025-05-17", "value": 270 },
        { "date": "2025-05-18", "value": 200 },
        { "date": "2025-05-19", "value": 310 },
        { "date": "2025-05-20", "value": 380 }
      ]
    },
    {
      "name": "Study Completions",
      "data": [
        { "date": "2025-05-14", "value": 180 },
        { "date": "2025-05-15", "value": 190 },
        { "date": "2025-05-16", "value": 210 },
        { "date": "2025-05-17", "value": 175 },
        { "date": "2025-05-18", "value": 140 },
        { "date": "2025-05-19", "value": 200 },
        { "date": "2025-05-20", "value": 220 }
      ]
    }
  ]
}

// Example response for comparison data
{
  "dimension": "studyType",
  "metrics": [
    {
      "name": "Clinical Trials",
      "applications": 1240,
      "completions": 380
    },
    {
      "name": "Surveys",
      "applications": 3800,
      "completions": 2800
    },
    {
      "name": "Focus Groups",
      "applications": 980,
      "completions": 480
    },
    {
      "name": "Longitudinal Studies",
      "applications": 750,
      "completions": 240
    }
  ]
}
```

## Getting Started

You will need to create your own project structure from scratch. This should include:

- A React frontend application
- A Node.js backend with the required API endpoints
- Mock data to populate the API responses

How you structure your project and which specific libraries you choose to use is up to you. This is part of the evaluation to see how you approach building a full-stack application.

### Mock Data

We've provided mock data to help you get started:

- The `/data` directory contains a TypeScript script that generates realistic mock data
- You can use this data directly or as a reference for creating your own data model
- The data structure aligns with the examples shown in this README
- Feel free to modify or extend the data to suit your implementation

## Evaluation Criteria

Your submission will be evaluated based on:

- Code quality and organization
- Component design and reusability
- User experience and interface design
- API implementation and data handling
- Error handling and edge cases
- Performance considerations
- Problem-solving approach and technical decisions

## Deliverables

- Complete source code in a Git repository
- Instructions for running the application locally
- Brief documentation explaining your technical choices and architecture
- Notes on any features you would add or improve given more time

## Time Expectation

You will have one week to complete this test. While we estimate the core requirements could be completed in approximately 8-10 hours of focused work, we're providing a week to accommodate your schedule and allow time for thoughtful implementation.

We value quality over quantity, so focus on delivering a well-structured solution rather than implementing every possible feature. Use the time to demonstrate your best work and technical decision-making.

## Submission

Please submit your solution as a Git repository link. Make sure your repository is public or shared with the appropriate users.

## KIKI'S NOTES

### How to run the app

Simply run 'npm run start' on the root directory, and it will build the BE and FE, and then run the whole stack concurrently. FE will by default hosted in localhost:3000 while the BE in localhost:4000

### Front End

- I used Tanstack query in the front end to query the data and send requests to the backend. I use this library because it's easy to use and we can easily extent the function to however we need as well. One example is to build a wrapper so dev can pass in options ie 'onSuccess' etc.
- I use MUI for the components because it works well with react and it has huge library for complex components ie graph and layout components. It also provide form fields that we can use for create or update form.
- I use next.js to build routing and page layout for the FE because it's one of the most common library to use for building frontend, and it works well with Tanstack query.
- I separate the different components into its own file, ie 'TrendsLineChart.tsx' to make it reusable and it's good practice to contain a component's logic in it's own file, so the parent only need to pass in necessary data for the component to work. I currently name the files specific to the data it's presenting, but if we want to reuse these components for other data, we can rename it to be something more generic.
- 'useAnalytics.ts' is there to contain the query logic for the api calls, most examples would show to do this inline within the FrontEnd tsx file, but it's better to isolate this and only export the 'use...' functions so the consumer only need to pass on the parameter.
- I was planning to use Tailwind to style the app, but since we only have simple data and graph, the MUI library is sufficient to style the data. But for more complex view/design, Tailwind is a great framework to use.

### Back End

- I use express.js in the backend for the controller layer, and I picked this library because it's robust and we can extent it to be more secure and versatile.
- I separate the controller with the service file so the controller only handle the network request while the service file handle the business logic. There's also 'middleware' directory that host the basic auth file and error handler.
- The auth is a simple concat between the word 'Basic' and encrypted credential with username: admin, and password: password. with this we can add auth layer to our controller and even the FE has to pass this as a token for the authorization header. For a simple app, this gets the job done, but for a proper app we need a proper auth ie fusionAuth.
- For the service functions, I read the data straight from the mockData json file, then I create separate service function for each data set. This is to separate out the logic into it's own service function, and with the help of typescript, we can enforce the typing. So in the future if we need to use these functions within each other or by different service, we can inform the type to the consumer.
- I added tests for the service functions that lives in 'analytics.test.ts' that uses Jest. This file is testing the edge cases for each service functions and also happy paths.

### Other Notes

- Instead of filtering by value of 'Study Type' eg 'Surveys' we filter by the category 'Study Type' itself, so we compare the Applications vs Completions number between the different 'Study Type'
- There are no create forms in this app, if there were, then I would have implemented zod validator to check the types of the submitted form. Other good addition is to add 'Data Grid' to show all of the created data, eg Participants Details.
- There's definitely room to improve how the app look, would love to spend more time on it, and a mock design would help as well.
