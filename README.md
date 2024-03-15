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
11. [Backend API Documentation](#backend-api-documentation)
12. [License](#license)


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

<p align="left"><img alt="unit tests report" src="./readmeResources/unitTests.webp" /></p>

To run unit test

```bash
cd backend

npx jest
```
Jest will test all the essential routes in the backend

---
## Code Coverage

<p align="left"><img alt="unit tests report" src="readmeResources/istanbulCoverageReport.webp" /></p>

To run the code coverage using Jest

```bash
cd .\backend\__tests__\

npx jest --coverage
```
Jest will execute all your tests and generate a coverage report at the end. <br>
Istanbul.js is built into Jest, so you will see a coverage report in the terminal, and html version in `.\backend\coverage\Icov-report\index.html`


---
## Running the Application with Docker

This guide outlines the steps to run the application using Docker. The application consists of both frontend and backend components.

### Prerequisites
- Docker installed on your machine. You can download and install Docker from [Docker's official website](https://www.docker.com/get-started).

### Instructions

#### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_directory>
```

#### 2. Build the Docker Image
```bash
docker build -t <image_name> .
```
Replace `<image_name>` with your desired image name.

#### 3. Run the Docker Container
```bash
docker run -d -p 5173:5173 -p 3000:3000 \
    -e DATABASE_URL=<your_database_url> \
    -e PORT=<your_port_number> \
    -e JWTSECRET=<your_jwt_secret> \
    <image_name>
```
Replace `<your_database_url>`, `<your_port_number>`, and `<your_jwt_secret>` with your specific configurations.

#### 4. Accessing the Application
Once the Docker container is running, you can access the application in your web browser:
- Frontend: http://localhost:3000
- Backend: http://localhost:5173

### Additional Notes
- Ensure that the specified ports (3000 and 5173) are not already in use by other applications.
- Make sure to provide correct values for environment variables (DATABASE_URL, PORT, JWTSECRET) during container execution.
- If you need to stop the container, you can use the `docker stop <container_id>` command, where `<container_id>` is the ID of the running container.


---
## Jenkins

### Setting up CI/CD with Jenkins

1. Install Jenkins by following the instructions [here](https://www.jenkins.io/doc/book/installing/).


2. Create a New Pipeline Project:
    - Log in to Jenkins.
    - Click on "New Item" to create a new project.
    - Enter a name for your project and select "Pipeline" as the project type.
    - Click "OK" to proceed.
    - In the configuration page:
        - Under "Pipeline", select "Pipeline script from SCM".
        - Choose Git as the SCM.
        - Enter the repository URL: `https://github.com/MKRadius/JourneyLingua.git`.
        - Set the branch to `main`.
        - Save the configuration.


3. Configure DockerHub Credentials:
    - Go to "Manage Jenkins" > "Manage Credentials".
    - Click on "Global credentials (unrestricted)" > "Add Credentials".
    - Choose "Username with password" as the kind.
    - Enter your DockerHub username and password.
    - Set an ID for your credentials (e.g., `DockerHub`) and click "OK" to save.


4. Update Jenkinsfile:
    - Replace `DOCKERHUB_CREDENTIALS_ID` with the ID you set for DockerHub credentials.
    - Update `DOCKERHUB_REPO` to your DockerHub repository.
    - Modify `DOCKER_IMAGE_TAG` as needed.


5. Run the Pipeline:
    - Trigger the pipeline manually or set up webhooks to trigger it automatically on each push.
    - Jenkins will checkout the code, build the frontend and backend, build a Docker image, and push it to DockerHub.


<p align="left"><img alt="Jenkins Pipeline" src="./readmeResources/jenkins_pipeline.png" /></p>

---
## Architectural Design

### Use Case Diagram

<p align="center"><img alt="Use Case Diagram" src="./readmeResources/UseCaseDiagram.png" /></p>

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

### Language Exercises

#### Get Random ImageToText Exercise

- **Endpoint:** `/lesson/imageToTextEx/random`
- **Method:** GET
- **Auth Required:** Yes
- **Description:** Retrieves a random set of ImageToText exercises.
- **Response:** Returns an array of randomly selected ImageToText exercises.

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
- **Auth Required:** Yes
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

#### Get User Profile by Username

- **Endpoint:** `/profile/:username`
- **Method:** GET
- **Auth Required:** Yes
- **Description:** Retrieves the profile information of a user by username.
- **URL Parameters:**
   - `username` (string): Username of the user.
- **Response:** Returns the user profile information.

### Important Notes

- Ensure that the `Authorization` header is included with the JWT token for protected endpoints.
- All dates are in the ISO 8601 format.
- Errors will be returned with appropriate status codes and error messages.
---
## License

This project is licensed under the [MIT License](LICENSE).
