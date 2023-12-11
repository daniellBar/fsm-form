# FSM - React Form

[Project Description - A brief overview of your project]

## Table of Contents
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Github Pages](#github-pages)
- [Remarks](#remarks)


## Technologies Used

- Typescript
- MUI
- Styled Components
- Formik
- Yup
- Jest
- React Testing Library

## Getting Started

### Prerequisites

Ensure that you have Node.js and npm installed on your machine.

The project includes a `package.json` file. Run the following command to install the necessary dependencies:

```bash
npm install
```
To run the app:
```bash
npm start
```
To run tests:
```bash
npm run test
```
By defaut the client making api request to an online mock server, but json server is also icluded, to run it:
```bash
npm run start-server
```

## Github Pages

[fsm-form](https://daniellbar.github.io/fsm-form/)

## Remarks

### FSM Functionality

The FSM functionality can be utilized in two ways within the project:

1. **Using `useFsmHook`:**
   - This approach involves utilizing the `useFsmHook` for integrating FSM functionality into your components.

2. **Creating an Instance of FSM Class:**
   - Alternatively, you have the option to create an instance of the `FSM` class for implementing FSM features.

Initially, I implemented the class but when i started writing the react part i decided to add a hook which is more  suitable for React environment.

### React App

The React app is designed as a simple one-page form with two steps to fill out. The FSM manages these two steps and the transitions between them


