# Event Reminder Client

Event Reminder Client is a web application that allows users to create, manage, and search events. Users can add new events, edit existing ones, delete them, and import events from a CSV file.

## Features

- Add new events
- Edit existing events
- Delete events
- Search events by title
- Filter events by status (all, complete, upcoming)
- Import events from a CSV file
- Pagination for event list
- Offline support for adding events

## Technologies Used

- React
- Redux Toolkit
- React Hook Form
- Yup (for form validation)
- Tailwind CSS (for styling)
- Papa Parse (for CSV parsing)
- React Router

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a backend server running that provides the necessary API endpoints for managing events.

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com//event-reminder-client.git
   cd event-reminder-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Add environment variables:**
   Create a `.env` file in the root of the project and add the necessary environment variables. For example:

   ```env
   VITE_REACT_APP_API_URL=http://127.0.0.1:8000/
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## CSV Import Feature

The application allows users to import events from a CSV file. The CSV file should have the following columns:

- title: The title of the event
- description: The description of the event
- event_date: The date of the event (in YYYY-MM-DDTHH:mm format)
- reminder_recipients: A comma-separated list of email addresses
- To import events from a CSV file, follow these steps:

Click on the "Import CSV" button on the home page.
Select a CSV file from your computer.
The events from the CSV file will be parsed and added to the event list.

## Example CSV Format

```bash
title,description,event_date,reminder_recipients,completed
Meeting with Team,Discuss project updates,2024-06-01 14:00:00,"john.doe@example.com,jane.doe@example.com",false
Client Presentation,Present new features to client,2024-06-02 10:00:00,"client@example.com,manager@example.com",false
Code Review,Review latest code changes,2024-06-03 09:00:00,"developer1@example.com,developer2@example.com",false
Product Launch,Launch the new product version,2024-06-04 12:00:00,"marketing@example.com,sales@example.com",false
Team Building Activity,Outdoor activities for team bonding,2024-06-05 15:00:00,"team@example.com",false
```
