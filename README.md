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

### How to Run the App

Simply run `npm i` to install all of the required node packages, and run `npm run generate:data` to generate the mock data json file. Then run `npm run start` from the root directory. This command will build both the backend (BE) and frontend (FE), and then start the entire stack concurrently. By default, the frontend is hosted at `localhost:3000` and the backend at `localhost:4000`.

---

### Front End

- **Data Fetching:**  
  I use TanStack Query on the frontend for data fetching and backend requests. I chose this library for its simplicity and flexibility—it’s easy to extend, for example by wrapping it to allow custom options like `onSuccess`.
- **UI Components:**  
  MUI is used for UI components due to its seamless React integration and comprehensive set of advanced components, such as graphs and form fields. This makes it suitable for both layouts and interactive forms.
- **Routing & Layout:**  
  Next.js handles routing and page structure. It’s a popular choice for frontend development and works well with TanStack Query.
- **Component Structure:**  
  Components are split into individual files (e.g., `TrendsLineChart.tsx`) to promote reusability and encapsulation—parents only need to provide necessary data. While files are currently named for the specific data they display, they can be renamed for broader reuse if needed.
- **API Logic:**  
  Query logic is encapsulated in files like `useAnalytics.ts`. Rather than placing API calls inline within components, this approach exposes only the necessary hooks (`use...`) to the component's consumers, promoting separation of concerns.
- **Styling:**  
  While I considered Tailwind CSS for additional styling, MUI was sufficient for the current requirements. For more complex views or designs, Tailwind could be a valuable addition.

---

### Back End

- **Framework:**  
  The backend uses Express.js for its robustness and extensibility.
- **Architecture:**  
  Controllers are separated from service files: controllers handle network requests, while services contain business logic. Middleware (e.g., for basic auth and error handling) lives in its own directory.
- **Authentication:**  
  Authentication uses a simple "Basic" scheme with hardcoded credentials (`admin`/`password`). This is sufficient for demo purposes, but a production app should use a more robust solution (e.g., FusionAuth).
- **Service Layer:**  
  Service functions read from mock JSON data and are organized by dataset. TypeScript enforces typing, making services reusable and maintainable.
- **Testing:**  
  Service functions are tested in `analytics.test.ts` using Jest, covering both edge cases and typical usage.

---

### Other Notes

- Instead of filtering by specific 'Study Type' values (e.g., "Surveys"), the app filters by the 'Study Type' category, comparing Applications vs. Completions across all types.
- The app does not include create forms; if it did, I would use Zod for form validation and possibly add a Data Grid for displaying created data (e.g., participant details).
- There’s room for UI improvements and enhancements, especially with a dedicated design mockup.
