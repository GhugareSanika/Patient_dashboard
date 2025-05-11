# Project Title

## Patient DashBoard

## Tech Stack

This project utilizes the following technologies:

- **Frontend:**
  - [Next.js](https://nextjs.org/) - The React Framework for Production
  - [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
  - [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js applications.
  - [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
- **Backend:** (Specify your backend technology if it's different from Next.js's API routes)
  - (e.g., Node.js, Express.js)

## Setup Instructions

Follow these steps to get the project running on your local machine.

## 1. Clone the Repository

Clone the project from the following link:

git clone [<GitHub>](https://github.com/GhugareSanika/Patient_dashboard.git)
cd <YOUR_PROJECT_DIRECTORY>

## 2. Install Dependencies

Install the necessary dependencies for both the frontend and backend :
npm install
This command will install all the dependencies listed in your package.json files located in the root directory.

## 3. Configure Environment Variables

You need to create separate .env files for the frontend and backend and populate them with the required environment variables.

## Frontend (frontend/.env)

Create a .env file inside the frontend directory and add the following:

NEXT_PUBLIC_API_URL=http://localhost:5000
Note: Replace http://localhost:5000 with your actual backend API URL if it's different.

## Backend (backend/.env)

Create a .env file inside the backend directory and add the following:

MONGO_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_specific_password
Important: Replace the placeholder values with your actual MongoDB connection string, JWT secret key, email address, and email password.

## 4. Run the Project

Start the frontend and backend development servers.

Frontend
Navigate to the frontend directory in your terminal and run:

cd frontend
npm run dev
This command will start the Next.js development server. You can usually access the frontend at http://localhost:3000.

Backend
Open a new terminal, navigate to the backend directory, and run:

cd backend
npm start
This command will start your backend server. The specific output and port will depend on your backend setup (e.g., Node.js with Express might run on http://localhost:5000 as configured in your .env.local for the frontend).

Getting Started
Once both the frontend and backend servers are running, you can open your browser and navigate to the frontend URL to start using the application. Refer to the project's documentation or codebase for further details on how to interact with the application.

This README file provides a clear and step-by-step guide for someone to set up and run your project, including the specific technologies used and the configuration of environment variables.
