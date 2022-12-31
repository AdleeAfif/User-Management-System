// Imports only
const express = require("express");
const exprhbs = require("express-handlebars");
const bodyParser = require("body-parser");

// Load env file
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000; // Change to other port if not working

// Use bodyParser middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application json
app.use(bodyParser.json());

// Setup static files (images/css/js)
app.use(express.static("public"));

// Config view engine
app.engine("hbs", exprhbs.engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");

const route = require("./server/routes/user");
app.use(route);

app.listen(port, () => console.log("Listening to port " + port));
