# TrueFeedback Web App

## Overview

**TrueFeedback** is a web application that allows users to receive feedback anonymously. The app is built using [Next.js](https://nextjs.org/), a React framework for production, and [MongoDB](https://www.mongodb.com/), a NoSQL database. It incorporates [Nodemailer](https://nodemailer.com/about/) for sending verification codes via email during the signup process.

## Features

- **Anonymous Feedback:** Users can receive feedback anonymously, ensuring privacy and honest communication.
- **Email Verification:** Ensures the authenticity of users by sending verification codes during the signup process.
- **MongoDB Integration:** The app uses MongoDB as the database for storing user data and feedback.
- **Next.js Framework:** Built with Next.js, providing server-side rendering and optimized performance.
- **Responsive Design:** The app is fully responsive, making it accessible on both desktop and mobile devices.
- **OpenAI ChatGPT Integration:** Leverage the power of AI to suggest messages, providing users with options for feedback or responses.

## Technologies Used

- **Frontend:**
  - Next.js
  - React
  - CSS (Tailwind CSS/Styled-Components)
  
- **Backend:**
  - Node.js
  - MongoDB
  - Mongoose (ODM for MongoDB)
  - Nodemailer (Email Service)

- **AI Integration:**
  - OpenAI ChatGPT (for suggesting message content)

- **Deployment:**
  - Vercel
  - MongoDB Atlas (for MongoDB deployment)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later) or **Yarn** (v1.x or later)
- **MongoDB** (Local installation or access to MongoDB Atlas)
- **Git** (for version control)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Klnishant/MysteryMessage.git
   cd truefeedback

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install

3. **Set up environment variables:**
Create a `.env` file in the root directory and add the following environment variables:

    ```bash
    MONGODB_URI = 
    RESEND_API_KEY = 
    NEXT_AUTH_SECRET = 
    OPENAI_API_KEY = 
    MAIL_USER = 
    Mail_PASS_KEY = 

4. **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev

Open http://localhost:3000 with your browser to see the result.

## Usage

1. **Sign Up:**
- Users can sign up with their email address.
- A verification code will be sent to the  user's email to verify the account.

2. **Log In:**
- After verification, users can log in to the application using their credentials.

3. **Receiving Feedback:**
- Once logged in, users can share a link with others to receive anonymous feedback.

4. **Viewing Feedback:**
- Feedback received can be viewed in the user's dashboard.

5. **Using ChatGPT for Suggested Messages:**
- Users can click on the "Suggest Message" button when composing feedback.
- ChatGPT will generate and suggest appropriate messages or responses.
- Users can modify or directly use these suggestions.

## License
This project is licensed under the MIT License. See the [LICENSE]() file for details.