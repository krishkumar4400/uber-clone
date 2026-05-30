/**
 * Backend entry point. Loads environment variables, connects to the database,
 * and starts the HTTP server.
 */
require("dotenv/config");
const conenctToDB = require("./src/db/database.js");
const app = require("./src/app.js");
const http = require("http");

const server = http.createServer(app);

const port = process.env.PORT || 4000;

conenctToDB();

/**
 * Start listening on the configured port.
 * @type {number|string}
 */
server.listen(port, () => {
  console.log(`server is up and running on http://localhost:${port}`);
});
