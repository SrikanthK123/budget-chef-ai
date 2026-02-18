
# BudgetChef AI 🥘

A smart cooking assistant that helps you plan meals based on your available ingredients and budget.

## Features

-   **AI-Powered Recipes**: Generates recipes tailored to your ingredients and budget using Google Gemini.
-   **Smart Fallback**: Includes a robust offline database for popular dishes when the AI is unavailable.
-   **Ingredient Checklist**: Interactive checklist to manage shopping and costs.
-   **Recipe History**: Saves your previous generations for easy access.

## Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS
-   **Backend**: Node.js, Express
-   **AI**: Google Gemini API

## Getting Started

1.  Clone the repository.
2.  Install dependencies for both client and server:
    ```bash
    cd client && npm install
    cd ../server && npm install
    ```
3.  Create a `.env` file in the `server` directory with your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    PORT=5000
    ```
4.  Start the development servers:
    -   Backend: `cd server && node server.js`
    -   Frontend: `cd client && npm run dev`
