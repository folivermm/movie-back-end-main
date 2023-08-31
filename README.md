# Movies Website Backend

## Introduction

This backend repository is responsible for setting up the database and building various routes that will be utilized by the frontend application. The development process involved making changes to both the data tier and the application tier, following an inside-out development workflow.

## Features and Achievements

Throughout the development of the Movies Website backend, the following features and achievements were accomplished:

   - Established a database setup.
   - Built out specific routes for accessing movie, theater, and review data.
   - Received and processed requests through RESTful routes.
   - Utilized route and query parameters to access relevant information.
   - Created comprehensive error handlers for scenarios where routes don't exist.
   - Implemented an API design adhering to RESTful principles.
   - Ensured all routes respond with appropriate status codes and structured responses.
   - Integrated common middleware packages to enhance functionality.
   - Customized and configured the knexfile.js file.
   - Successfully connected to a database using Knex.
   - Crafted database queries for full CRUD routes within an Express server.
   - Performed data joins and nested data retrieval using Knex.
   - Executed database migrations using Knex's migration tool.
   - Incorporated the cors package to facilitate correct frontend-backend communication.
   - Deployed the backend server to a cloud service for remote access.

## Routes

The backend provides the following routes to interact with the Movies Website:

    GET /movies: Retrieves a list of movies.
    GET /movies?is_showing=true: Retrieves a list of movies currently showing.
    GET /movies/:movieId: Retrieves details about a specific movie.
    GET /movies/:movieId/theaters: Retrieves theaters playing a specific movie.
    GET /theaters: Retrieves a list of theaters.
    GET /movies/:movieId/reviews: Retrieves reviews for a specific movie.
    PUT /reviews/:reviewId: Updates a review based on the provided review ID.
    DELETE /reviews/:reviewId: Deletes a review based on the provided review ID.

## Tables and Migrations

The backend database is structured with the following tables, each serving a specific purpose:

   - Movies
   - Theaters
   - Movie-Theater Relationships
   - Reviews
   - Critics

The database structure and schema were established using Knex migrations.

## Getting Started

The following instructions are provided to set up both the backend and frontend components of the Movies Website. Ensuring that you've successfully completed the setup for both repositories to experience the full functionality of the website. 

### Frontend Repository

Check out the frontend repository and README at: [project-we-love-movies-frontend](https://github.com/dakotawatkins/project-we-love-movies-frontend).


1. **Install dependencies and start**
 	- npm install
 	- npm start
2. **Troubleshooting Frontend:**
   If you encounter any issues while setting up the frontend, try the following steps:
 	- npm audit fix --force
 	- npm install util
3. **Run the build process:**
 	- npm run build	

### Backend Setup

1. **Fork and Clone:**
Begin by forking and cloning this repository to your local machine.

2. **Install Dependencies:**
Run the following command to install required dependencies:
- npm install

3. **Set Up Environment:**
Copy the `.env.sample` file to create your `.env` file:
- cp .env.sample .env

4. **Create a Cloud Database:**
- Create a database on Elephant SQL or any other cloud database service you prefer.
- Copy the URL of the created database.
- Open the `.env` file you created earlier and replace the value of `DATABASE_URL` with the copied database URL.

5. **Deploy Backend on Render:**

4. **Deploy Backend on Render:**
- Connect your GitHub backend repository and create a web service.
- Change commands to: `npm install` and `npm start`.
- **IMPORTANT:** Add an environmental variable with key `DATABASE_URL` and value as your Elephant SQL URL.
- Create the web service.

### Frontend and Backend Integration
1. **Frontend Workspace:**
Open the frontend repository and add the backend repository as a workspace.

2. **Terminal Windows:**
Open two terminal windows and navigate to the frontend and backend folders respectively.

3. **Backend Terminal:**
In the backend terminal window, run:

- npm start

4. **Frontend Terminal:**
In the frontend terminal window, run:
- npx serve -s build --listen 3000


5. **Visit the Site:**
Open your web browser and visit the website at:

http://localhost:3000/
