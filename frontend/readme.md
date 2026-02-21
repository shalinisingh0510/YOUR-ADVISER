your_Advisor — README
🧠 About the Project

your_Advisor is a personalized career & learning guidance platform for students and young professionals.

Users answer a smart questionnaire, and based on:

learning ability

language preference

aptitude

prior knowledge

consistency

the system generates detailed, step-by-step learning roadmaps using LLM models, with free resources (blogs, YouTube, courses).

🎯 Key Features (Planned)

User authentication (Email + OAuth)

Smart questionnaire engine

Personalized roadmap generation

Progress tracking dashboard

Editable & versioned roadmaps

LLM-powered guidance (free models initially)

Scalable architecture (100k+ users ready)

🧩 TECH STACK
Frontend

React (Vite)

Tailwind CSS

React Router

React Hook Form

Zustand / Context API

Axios

Backend

Node.js

Express.js

PostgreSQL

JWT Authentication

bcrypt

LLM (HuggingFace – free)

🚀 DEVELOPMENT PHASES
🟦 FRONTEND DEVELOPMENT (FIRST)
📁 Frontend Folder Structure (Planned)
frontend/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── router.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── questionnaire/
│   │   │   ├── Questionnaire.jsx
│   │   │   └── AptitudeTest.jsx
│   │   ├── roadmap/
│   │   │   └── RoadmapView.jsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   └── roadmap/
│   ├── services/
│   │   └── api.js
│   ├── store/
│   ├── hooks/
│   └── styles/
├── index.html
└── vite.config.js

🟢 FRONTEND PHASE 1 — Project Setup (TO DO)
Tasks

 Create Vite + React project

 Install Tailwind CSS

 Setup React Router

 Create base layout (Navbar, Footer)

 Setup API service (Axios)

📌 Goal: App runs with clean layout

🟢 FRONTEND PHASE 2 — Auth UI (TO DO)
Pages

Login

Signup

Tasks

 Build signup form

 Build login form

 Client-side validation

 Connect to backend /api/auth/*

 Store JWT in localStorage

📌 Backend dependency: Auth APIs (already done)

🟢 FRONTEND PHASE 3 — Questionnaire UI (TO DO)
Pages

Questionnaire

Aptitude Test

Tasks

 Fetch questionnaire from backend

 Render dynamic questions

 Handle scale / MCQ / multi-select

 Submit answers to backend

 UX for aptitude test

📌 Important:
Frontend does NOT contain logic — only rendering.

🟢 FRONTEND PHASE 4 — Roadmap Display (TO DO)
Page

Roadmap View

Tasks

 Render roadmap steps

 Timeline (weeks/months)

 Checklist UI

 Resource links (YouTube, blogs)

 Editable roadmap notes

🟢 FRONTEND PHASE 5 — Dashboard (TO DO)
Page

Dashboard

Tasks

 Show active roadmap

 Progress bar

 Completed steps

 Regenerate roadmap button

 Version history view

🟢 FRONTEND PHASE 6 — Polish (TO DO)
Tasks

 Student-friendly UI

 Responsive design

 Dark mode (optional)

 Error & loading states