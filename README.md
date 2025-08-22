# Problem Statement

Build a Student Event Manager application for a college fest.

The app should have:

# Backend (Node.js + Express)

API endpoints:

POST /events → Create an event (name, date, description).

GET /events → Fetch all events.

GET /events/:id → Fetch one event by ID.

DELETE /events/:id → Delete an event.

Use in-memory storage (array) or JSON file (no DB required).

# Frontend (React + Tailwind)

Page to list all events (table or cards).

Form to add a new event.

Option to delete an event (with a button).

Fetch data from backend using fetch/axios.

CLI Tool (Optional, Bonus)

Create a simple CLI (node cli.js) to:

node cli.js list → Show all events.

node cli.js add "Event Name" "2025-09-01" "Fun Event" → Add an event.

# Git/GitHub

Push code to GitHub in a clean repo.

Include a README.md with:

Setup instructions (npm install, npm start).

API docs (endpoints).

Screenshot of frontend (if possible).
