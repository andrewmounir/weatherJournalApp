// Setup empty JS object to act as endpoint for all routes

let projectData = {};
//  Allow cors to run on private- Network on chrome to avoid any errors in the console
// "Access-Control-Allow-Private-Network ": "true"

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static(__dirname));
// Spin up the server
app.listen(3000, console.log("server running on port 3000"));
// Callback to debug

// Initialize all route with a callback function
app.get("/all", (req, res) => {
  res.send(projectData);
});

// Post Route to receive data from the app to send it through get request later to update UI after being processed by the server
app.post("/push", (req, res) => {
  console.log(req.body);
  let data = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  };
  projectData = data;
});
