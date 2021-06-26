Tester tool for the Pokemon Revolution Online game

## Make it works for development 

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

## Make it works for production

For the frontend part:

### `npm run build`

Will create a folder ./build that you can put directly in a web server

**_______________________________________________________**

For the backend part:

### `Docker`

You can use either docker with a dockerfile or docker-compose

### `pm2`

You can also use pm2 by using the command `pm2 start server.js`