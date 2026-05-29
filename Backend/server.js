require('dotenv/config');
const conenctToDB = require('./db/database.js');
const app = require('./src/app.js');
const http = require('http');

const server = http.createServer(app);

const port = process.env.PORT || 4000;

conenctToDB();

server.listen(port, () => {
    console.log(`server is up and running on http://localhost:${port}`); 
});