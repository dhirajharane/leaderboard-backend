# Leaderboard App Backend

## Overview
This is the backend for the Leaderboard App, built with **Node.js**, **Express**, and **MongoDB**. It manages user data, point claims, and leaderboard rankings, providing RESTful APIs for the frontend.

## Features
- **User Management:** Create and retrieve users.
- **Point Claims:** Award random points (1-10) to users and store history.
- **Leaderboard:** Generate real-time rankings with pagination (10 users/page).
- **Point History:** Log each point claim with user ID and timestamp.

## Tech Stack
- Node.js  
- Express  
- MongoDB (Mongoose)  
- CORS, Dotenv  

## Project Structure
\`\`\`
backend/
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   └── PointHistory.js
├── routes/
│   └── api.js
├── package.json
├── server.js
├── .env
└── .gitignore
\`\`\`

## Setup Instructions

### 1. Clone Repository
\`\`\`bash
git clone <your-repo-url>
cd backend
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables
Create a `.env` file:
\`\`\`
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/leaderboard?retryWrites=true&w=majority
\`\`\`
Use MongoDB Atlas URI or local MongoDB (`mongodb://localhost:27017/leaderboard`).

### 4. Run the Backend
\`\`\`bash
npm run dev
\`\`\`
Server runs on: [http://localhost:5000](http://localhost:5000)

## API Endpoints

- `GET /api/users` - List all users.  
- `POST /api/users` - Add a new user (`{ "name": "User" }`).  
- `POST /api/claim` - Award points to a user (`{ "userId": "<id>" }`).  
- `GET /api/leaderboard?page=` - Get paginated leaderboard.  
- `GET /api/history/:userId` - Get point history for a user.

## Deployment (Render)
1. Push code to a GitHub repository (`backend/` folder).
2. In Render, create a Web Service:
   - **Runtime:** Node  
   - **Build Command:** `npm install`  
   - **Start Command:** `npm start`  
   - **Environment Variable:** `MONGO_URI=<your-atlas-uri>`

3. Deploy and access at: `https://your-app.onrender.com`

## Testing
- Use **Postman** to test endpoints.
- Verify MongoDB collections: `users` and `pointHistory`.
- Ensure CORS allows frontend (`http://localhost:5173`).