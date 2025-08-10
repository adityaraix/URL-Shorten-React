<h1>URL Shortify - A MERN Stack URL Shortener </h1>
URL Shortify is a simple, full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to shorten long URLs into a more manageable format. It also includes an admin dashboard to track the usage of each shortened link.

<h2>Features</h2>
<b>Shorten URLs:</b> Convert any valid long URL into a short, unique link.

<b>Seamless Redirects:</b> Visiting a shortened link will instantly redirect the user to the original URL.

<b>Admin Dashboard:</b> A separate view to see all the shortened URLs in one place.

<b>Visit Tracking:</b> The admin dashboard tracks and displays how many times each short link has been visited.

<h2>Tech Stack</h2>
Frontend: React, Vite, Axios

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Utilities: shortid for generating unique codes, cors for handling cross-origin requests.

Project Structure
This project uses a monorepo structure with two main directories:

url-shortener-backend/: Contains the Node.js/Express server and all API logic.

url-shortener-frontend/: Contains the React client-side application.

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Make sure you have the following installed on your machine:

Node.js (v14 or later)

npm (usually comes with Node.js)

MongoDB (make sure the server is running)

Installation & Setup
Clone the repository:

git clone https://github.com/adityaraix/URL-Shorten-React.git
cd URL-Shorten-React



<h2>Setup the Backend:</h2>

# Navigate to the backend folder
cd url-shortener-backend

# Install dependencies
npm install

# Create a .env file in this directory
# Add your environment variables (see below)



Setup the Frontend:

# Navigate to the frontend folder from the root directory
cd url-shortener-frontend

# Install dependencies
npm install

# Create a .env.local file in this directory
# Add your environment variables (see below)



Environment Variables
You need to create .env files for both the backend and frontend.

Backend (url-shortener-backend/.env):

MONGO_URI=mongodb://localhost:27017/url-shortener
PORT=5000



Frontend (url-shortener-frontend/.env.local):

VITE_API_BASE_URL=http://localhost:5000



Running the Application
You need to run the backend and frontend servers in two separate terminals.

Terminal 1 (Backend):

cd url-shortener-backend
npm run dev



The backend server should be running on http://localhost:5000.

Terminal 2 (Frontend):

cd url-shortener-frontend
npm run dev



The frontend application will be available at http://localhost:5173 (or another port specified by Vite).

API Routes
The application uses these main routes:

POST /api/shorten: Takes a long URL and saves a short version.

GET /:shortCode: Finds the original URL and redirects the user.

GET /api/stats: Shows a list of all shortened links and their visit counts.
