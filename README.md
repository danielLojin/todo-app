# MERN Stack To-do App

Full-stack project built using Express, MongoDB, Mongoose and Node.js on the backend and React, TypeScript, TailwindCSS, Tanstack/React Query, React Router, Zod and Vite.

Simple to-do application that allows you to fetch to-do notes from database, create new to-do notes, update existing to-do notes or delete them.

## Run Locally

Clone the project

```bash
  git clone https://github.com/danielLojin/todo-app
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Create new file in the root of the folder

```bash
  Mac/Linux: touch .env
  Windows: echo. > .env
```

Create new MongoDB project and copy the URL of the project to .env file and name the variable like this:

```bash
  MONGO_DB_URL=MONGODB-URL
```

Start the server

```bash
  npm run dev
```
