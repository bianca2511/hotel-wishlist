
# Hotel wishlist
This is a simple web application that takes a "database" of hotels and enables users to create wishlists and sort the existing hotels. Since this is only a small prototype, there is no real database connection. the data is stored in-memory on the server. Restarting the server clears the wishlist data. 

# React template with Vite and Deno

This project was built from a GitHub template project to set up a [React](https://react.dev/) app
with TypeScript running on [Deno](https://deno.com). It uses
[Vite](https://vite.dev) as the dev server and an [oak](https://jsr.io/@oak/oak)
http server on the backend to serve the built project.

## Features
- React with TypeScript on the frontend
- Vite for the development server
- Deno for server-side JavaScript/TypeScript
- Oak framework for building web applications
- Static file serving
- Router setup

## Getting Started

### Prerequisites

To run this app, you will need to have [Deno](https://docs.deno.com/runtime/)
installed.


To install the dependencies for the frontend and backend, run the following
command:

```sh
deno install
```

## Run the dev server with vite

The app uses a Vite dev server to run in development mode. To start the dev
server, run the following command:

```sh
deno run dev
```

## Build the app

To build the app for production, run the following command:

```sh
deno run build
```

## Run the backend server

The backend server uses Deno and the Oak framework to serve the built React app.
To start the backend server, run the following command:

```sh
deno run serve
```

## Running Tests

To run the tests, use the following command:

```sh
deno run test 
```

## Template Structure

```sh
. 
├── client 
│   ├── dist 
│   ├── public 
│   └── src 
│       ├── App.tsx 
│       └── main.tsx 
└── server 
    ├── main.ts 
    └── util 
        └── routeStaticFilesFrom.ts
```
- `App.tsx`: The main React component
- `main.tsx`: The entry point for the React app
- `main.ts`: The entry point for the Deno server
- `routeStaticFilesFrom.ts`: A utility function to serve static files
- `dist`: The output directory for the built React app
- `public`: The public directory for the React app

## Points of note

The React app is contained in the `client` directory. This is also where Vite
will install its dependencies and build the app.

There is a `vite.config.ts` file in the root of the project that configures Vite
to build the app in the `client/dist` directory and serve the app on `port 3000`.

The `deno.json` file contains the tasks to run the dev server, build the app,
and serve the app, along with the dependencies and the compiler configuration
required to use JSX and React.

The Deno server is contained in the `server` directory. The server serves the
built React app from the `client/dist` directory and listens on `port 8000`. 
