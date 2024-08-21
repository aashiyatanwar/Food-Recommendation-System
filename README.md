# Food Recommendation System

A full-stack web application built using the MERN stack to recommend favorite food to users based on their preferences such as time, money, and cuisine. Users can search for specific food items, add dishes with recipes, and interact with posts by liking, commenting, and following other users.

## Features

- **Food Recommendations**: Get food recommendations based on time, money, and cuisine preferences.
- **Search Functionality**: Search for specific food items.
- **User Profiles**: Users can create profiles, add posts (dishes with recipes), and manage their content.
- **Social Interaction**: Like, comment on posts, and follow other users.
- **Google Login**: Authentication handled through Firebase using Google.

## Tech Stack

- **Frontend**: React (located in `client` folder)
- **Backend**: Node.js, Express.js (located in root directory)
- **Database**: MongoDB (NoSQL)
- **Authentication**: Firebase (Google login)
- **Deployment**: [Render](https://render.com)

## Demo

Check out the live application here: [Food Recommendation System](https://yumquest-g61s.onrender.com/)

## Installation and Setup

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- Firebase account for authentication

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/aashiyatanwar/Food-Recommendation-System.git
   cd Food-Recommendation-System

2. Backend Setup:

    - Navigate to the backend folder: cd server
    - Create a .env file and add the following variables
        ```bash
        DB_STRING = your-mongodb-connection-string

    - Run : npm install && npm run dev

3. Frontend Setup:

   - Navigate to the frontend folder: cd client
   - Create a .env file and add Firebase configurations:
        ```bash
        REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
        REACT_APP_FIREBASE_PROJECT_ID=your-project-id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
        REACT_APP_FIREBASE_APP_ID=your-app-id
    - Run : npm install && npm start
