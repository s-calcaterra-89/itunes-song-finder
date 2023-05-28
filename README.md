This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In order to start the app you need Node.js installed on your computer.
The development has been based on version 18.12.0 (Stable).

# Clone git repository:

git clone https://github.com/s-calcaterra-89/itunes-song-finder.git

Ensure you're positioned on the branch "main" (it should be done automatically after cloning).

Alternatively you can download it from
https://github.com/s-calcaterra-89/itunes-song-finder

In order to correctly start the application, in the project directory, run:

### `npm install`

After successful node_modules install, run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Notes

The page title changes after the api call completes.
Sometimes, there could be some false positive results in the response:
the page title shown is based on the largest number of matching words in the attribute "artistName"
and the largest number of results for that name.
