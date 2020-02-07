Tester tool for the Pokemon Revolution Online game

## How to make it works for production

Go into the ./frontend folder.<br />
Then run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

**_______________________________________________________**

Go back into the ../backend folder.<br />
Then run:

### `node server.js`

Will created the server for the 3001 port.<br />
If you make change, you'll have to stop it and recreate it with the same command.

## How to make it works when uploaded online

For the frontend part:

### `npm run build`

Will create a folder ./build that you can put directly in an apache server (for example) to make it works

**_______________________________________________________**

For the backend part:

### `Docker`

Use docker to make it works in background.
