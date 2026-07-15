// Import the Express framework
const express = require("express");

// Create an Express application
// 'app' represents our web server
const app = express();

// Define the port number on which the server will listen
const PORT = 3000;

// ==========================
// ROUTES
// ==========================

// Handle GET requests to the root URL (/)
//
// When someone visits:
// http://localhost:3000
//
// Express executes this function.
app.get("/", (req, res) => {

    // req  -> Information sent by the client (browser)
    // res  -> Used to send a response back to the client

    // Send plain text back to the browser
    res.send("Hello, Docker!");
});

// ==========================
// START SERVER
// ==========================

// Start the web server and listen for incoming requests
app.listen(PORT, () => {

    // This callback runs once the server has started successfully
    console.log(`Server is running on port ${PORT}`);

});
