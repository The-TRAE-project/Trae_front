# TRAE

Frontend part of TRAE.

---

## Built With

**Client:** Vite, React, TS, Mantine, styled-components, Docker, NGINX.

## Features

- Display of all employees, constructors, types of work and projects.
- Creation of an employees, constructors, types of work and projects.
- Editing of an employees, constructors, types of work and projects.
- Filtering by several directions, such as active and inactive, searching for projects by project number and client name, filtering employees by type of work.
- Completion, deletion of the project.
- Viewing data in your personal account, as well as editing and changing your password.
- Separate page for terminal workshop.
- The possibility of taking the project to work and completion by an employee(terminal workshop).
- Login and auto logout by 120 sec timer(terminal workshop).

## How To Use

### Installation

1. First clone the repo

   ```sh
   git clone https://github.com/The-TRAE-project/Trae_front.git
   ```

2. Go to the project directory

   ```sh
   cd Trae_front
   ```

3. Install all packages

   ```sh
   npm install
   ```

### Running the app

##### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_BACK_API_URL`
`VITE_A_TOKEN`
`VITE_A_TOKEN_EXPIRATION`

##### In development mode

- After installing all packages, run locally

  ```sh
  # development
  npm run start
  ```

- If you have `docker` on your local computer, run the command to create the image in dev mode

  ```sh
  # docker dev mode
  docker build -f Dockerfile.dev -t dev-image .
  ```

  ```sh
  # run in dev mode
  docker-compose -f docker-compose-dev.yml up
  ```

- If you have `make` on your local computer, run the command to create the image in dev mode

  ```sh
  # make dev mode
  make build-dev
  ```

  ```sh
  # run in dev mode
  make run-dev
  ```

##### In production mode

- After installing all packages, run locally

  ```sh
  # production build
  npm run build
  ```

  ```sh
  # run in prod mode
  npm run preview
  ```

- If you have `docker` on your local computer, run the command to create the image in prod mode

  ```sh
  # docker prod mode
  docker build -f Dockerfile.prod -t eld11ar/trae-front .
  ```

  ```sh
  # run in prod mode
  docker-compose -f docker-compose-prod.yml up
  ```

- If you have `make` on your local computer, run the command to create the image in dev mode

  ```sh
  # make prod mode
  make build-prod
  ```

  ```sh
  # run in prod mode
  make run-prod
  ```
