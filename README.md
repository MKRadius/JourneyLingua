# JourneyLingua - language learning application

<p align="center"><img src="./readmeResources/Journey_Lingua_logo.png" /></p>
JourneyLingua is a language learning app designed to provide users with engaging exercises and interactive content to facilitate language acquisition.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Tests](#tests)
6. [Code Coverage](#code-coverage)
7. [Running the Application with Docker](#running-the-application-with-docker)
8. [Jenkins](#jenkins)
9. [Architectural Design](#architectural-design)
    - [Use Case Diagram](#use-case-diagram)
    - [ER Diagram](#er-diagram)
10. [Configuration](#configuration)
11. [File Structure](#file-structure)
12. [Contributing](#contributing)
13. [License](#license)


## Introduction

This project is a full-stack web application built for language learning, 
utilizing the PERN stack (PostgreSQL, Express, React, and Node.js). <br>
Prisma serves as the ORM (Object-Relational Mapping) tool, and PostgreSQL is used as the database.

**Technologies utilised in this project**

[![Technologies](https://skillicons.dev/icons?i=ts,react,express,nodejs,postgres,prisma,docker,jenkins,jest,git,&theme=light)](https://skillicons.dev)

The application allows users to create an account, log in, and engage in language learning exercises. <br>
There are two types of exercises available: 
- selecting the correct word in Finnish corresponding to an image displayed
 - arranging words in random order to form a sentence.

---
## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/current) and npm
- [PostgreSQL](https://www.postgresql.org/download/)

---
## Installation

1. Clone the repository:

```bash
git clone https://github.com/MKRadius/JourneyLingua.git
cd JourneyLingua
```

3. Install dependencies for both the backend and frontend:

```bash
cd backend
npm install

cd ../frontend
npm install
```
4. Create .env file in the `backend` folder and fill the following credentials:
```bash
PORT=3000
JWTSECRET=<your JWT Secret Key>
DATABASE_URL=<your postgresql database link as such "postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public">
SHADOW_DATABASE_URL=<your shadow postgresql database link for Prisma>
```
Read more about shadow database [here](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database).

---
## Usage

To start the application you have 2 options:

Either run the `start-script-"your OS"` file in the terminal from the root folder of the project (starts the frontend & backend server)

or do follow these steps:

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:5173 to view the application.<br>
   (If port is not free, Vite uses the next free port number which can be seen in the console.)

---
## Tests

TODO 

Describe the tests and how to run them.

---
## Code Coverage

TODO

Need to explain how to run code coverage and view the results.

---
## Running the Application with Docker

### Backend Application

1. **Build Docker Image**: Navigate to the directory containing the `Dockerfile_backend`. Run the following command to build the Docker image for the backend application:

    ```bash
    docker build -t backend-app -f Dockerfile_backend .
    ```

2. **Run Docker Container**: Once the Docker image is built, run a Docker container using the following command:

    ```bash
    docker run -p 3000:3000 backend-app
    ```

   Access the backend application at [http://localhost:3000](http://localhost:3000).

### Frontend Application

1. **Build Docker Image**: Navigate to the directory containing the `Dockerfile_frontend`. Run the following command to build the Docker image for the frontend application:

    ```bash
    docker build -t frontend-app -f Dockerfile_frontend .
    ```

2. **Run Docker Container**: Once the Docker image is built, run a Docker container using the following command:

    ```bash
    docker run -p 5173:5173 frontend-app
    ```

   Access the frontend application at [http://localhost:5173](http://localhost:5173).
---
## Jenkins

### Setting up CI/CD with Jenkins

1. Install Jenkins [here](https://www.jenkins.io/doc/book/installing/).

2. Create a New Pipeline Project:
   - Log in to Jenkins and create a new pipeline project.
   - Choose "Pipeline" as the project type.
   - Configure the pipeline to use the Jenkinsfile located in the root directory of your project's repository.

3. Customize Pipeline Script: Customize the Jenkinsfile according to your project structure and requirements. Below is a basic example of a Jenkinsfile for Node.js applications:

```groovy
pipeline {
    agent any
    stages {
        stage("Checkout") {
            steps {
                git branch: 'main', url: 'https://github.com/MKRadius/JourneyLingua.git'
            }
        }
        stage("Build") {
            steps {
                sh 'npm install'
            }
        }
    }
}
```
---
## Architectural Design

### Use Case Diagram

<p align="center"><img alt="UseCaseDiagram" src="./readmeResources/UseCaseDiagram.png" /></p>

### ER Diagram

<p align="center"><img alt="ERD_DB_diagram"  src="./readmeResources/ERD_DB_diagram.png" /></p>

### Database Schema

<p align="center"><img alt="Database Schema" src="./readmeResources/Relational_DB_Schema.png" /></p>

---
## Configuration

### Backend Configuration

- Database configuration is specified in the `backend/prisma/schema.prisma` file.
- Environment variables can be configured in the `.env` file located in the `backend` directory.

### Frontend Configuration

- TypeScript compiler options and project settings are defined in the `frontend/tsconfig.json` file.
- Vite build tool configuration, including development server settings and build options, can be found in the `frontend/vite.config.ts` file.

___
## File Structure

TODO

add screen of file structure

---
## Backend API Documentation

### Backend

The base URL for all API endpoints is `http://localhost:3000/`. Ensure that all requests to the backend are directed to this base URL.

### Authentication

All protected endpoints require a valid JWT token passed in the `Authorization` header of the request. The token should be prefixed with `Bearer `. The middleware verifies the token and checks for the user's existence in the database.

**Example Authorization header:**
Authorization: Bearer <YOUR_TOKEN>

If authentication fails, the API responds with a `401 Unauthorized` status code.

## API Endpoints

[//]: # (JUST FOR TESTS)

[//]: # (### User Actions)

[//]: # ()
[//]: # (#### Delete User)

[//]: # ()
[//]: # (- **Endpoint:** `/deleteUser/:userId`)

[//]: # (- **Method:** DELETE)

[//]: # (- **Auth Required:** Yes)

[//]: # (- **Description:** Deletes a user from the database based on the user ID provided in the URL path.)

[//]: # (- **URL Parameters:**)

[//]: # (   - `userId` &#40;number&#41;: ID of the user.)

### Language Exercises

#### Get Random ImageToText Exercise

- **Endpoint:** `/lesson/imageToTextEx/random`
- **Method:** GET
- **Auth Required:** Yes
- **Description:** Retrieves a random set of ImageToText exercises.
- **Response:** Returns an array of randomly selected ImageToText exercises.

[//]: # (JUST FOR DEV)

[//]: # (#### Get All ImageToText Exercises)

[//]: # ()
[//]: # (- **Endpoint:** `/lesson/imageToTextEx`)

[//]: # (- **Method:** GET)

[//]: # (- **Auth Required:** No)

[//]: # (- **Description:** Retrieves all ImageToText exercises.)

[//]: # (- **Response:** Returns an array of all ImageToText exercises.)

#### Create ImageToText Exercise

- **Endpoint:** `/lesson/imageToTextEx`
- **Method:** POST
- **Auth Required:** Yes
- **Description:** Creates a new ImageToText exercise.
- **Request Body:**
   - `wordEng` (string): English word for the exercise.
   - `wordFin` (string): Finnish translation of the word.
   - `category` (string, optional): Category of the exercise.
   - `subCategory` (string, optional): Subcategory of the exercise.
   - `imageLink` (string): Link to the image associated with the exercise.
   - `exerciseId` (number): ID of the exercise.
   - `languageId` (number): ID of the language for the exercise.
- **Response:** Returns the created ImageToText exercise.

#### Get Random MakeASentence Exercise

- **Endpoint:** `/lesson/makeASentenceEx/random`
- **Method:** GET
- **Auth Required:** Yes
- **Description:** Retrieves a random set of MakeASentence exercises.
- **Response:** Returns an array of randomly selected MakeASentence exercises.

#### Get MakeASentence Exercise by ID

- **Endpoint:** `/lesson/makeASentenceEx/:id`
- **Method:** GET
- **Auth Required:** Yes
- **Description:** Retrieves a MakeASentence exercise by its ID.
- **URL Parameters:**
   - `id` (number): ID of the MakeASentence exercise.
- **Response:** Returns the MakeASentence exercise with the specified ID.

#### Create MakeASentence Exercise

- **Endpoint:** `/lesson/makeASentenceEx`
- **Method:** POST
- **Auth Required:** Yes
- **Description:** Creates a new MakeASentence exercise.
- **Request Body:**
   - `sentenceEng` (string): English sentence for the exercise.
   - `sentenceFin` (string): Finnish translation of the sentence.
   - `exerciseId` (number): ID of the exercise.
   - `languageId` (number): ID of the language for the exercise.
- **Response:** Returns the created MakeASentence exercise.

### Language Management

#### Create Language

- **Endpoint:** `/language`
- **Method:** POST
- **Auth Required:** No
- **Description:** Creates a new language.
- **Request Body:**
   - `languageName` (string): Name of the language.
- **Response:** Returns the created language.

### User Authentication

#### User Login

- **Endpoint:** `/login`
- **Method:** POST
- **Auth Required:** No
- **Description:** Allows users to log in.
- **Request Body:**
   - `username` (string): Username of the user.
   - `password` (string): Password of the user.
- **Response:** Returns a JWT token upon successful login.

#### User Signup

- **Endpoint:** `/signup`
- **Method:** POST
- **Auth Required:** No
- **Description:** Allows users to sign up.
- **Request Body:**
   - `username` (string): Desired username for the user.
   - `password` (string): Password for the user.
   - `email` (string): Email address of the user.
   - `firstname` (string): First name of the user.
   - `lastname` (string): Last name of the user.
- **Response:** Returns a JWT token upon successful signup.

### User Profile

[//]: # (JUST FOR TESTS)

[//]: # (#### Get All Users)

[//]: # ()
[//]: # (- **Endpoint:** `/users`)

[//]: # (- **Method:** GET)

[//]: # (- **Auth Required:** No)

[//]: # (- **Description:** Retrieves all users.)

[//]: # (- **Response:** Returns an array of all users.)


[//]: # (???)

#### Get User Profile by Username

- **Endpoint:** `/profile/:username`
- **Method:** GET
- **Auth Required:** No
- **Description:** Retrieves the profile information of a user by username.
- **URL Parameters:**
   - `username` (string): Username of the user.
- **Response:** Returns the user profile information.

## Important Notes

- Ensure that the `Authorization` header is included with the JWT token for protected endpoints.
- All dates are in the ISO 8601 format.
- Errors will be returned with appropriate status codes and error messages.



## License

This project is licensed under the [MIT License](LICENSE).
