# Contact list

Contact list app.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run Locally

Open the terminal and clone the repository if this is the first time you are trying to run this application:

```bash
$ git clone https://github.com/StamatisDeli/agenda.git
```

Move to the application's root folder:

```bash
$ cd agenda
```

Add an `.env` file in the root folder and add the following:

```bash
SKIP_PREFLIGHT_CHECK=true
REACT_APP_BASE_URL=https://my-json-server.typicode.com/tsevdos/epignosis-users
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Press 'a' to run all tests in watch mode

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn cypress:open`

Starts Cypress testing suite\
(You must do `yarn start` first!)

Also, there is a CI running in GitHub each time changes are introduced to the codebase.

## Using the app

The first time you see an instruction screen to right

![screenOne](/public/Screenshot.png#screenshot)

If you click on a user, you can see their details, edit and save them (save not implemented in API yet)

![screenTwo](/public/Screenshot-2.png#screenshot)

After selecting a user, the app will remember the selected user

<style type="text/css">
    img[src*="#screenshot"] {
        max-height: 300px;
        max-width: 300px;
    }
</style>
