// Import Express
const express = require("express");

// Import Mongoose
const mongoose = require("mongoose");

// Import Todo model
const Todo = require("./models/Todo");

// Create Express application
const app = express();

// Server port
const PORT = 3000;

// MongoDB connection string
// "mongodb" is the service name from docker-compose.yml
const MONGO_URI = "mongodb://mongodb:27017/tododb";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Home route
app.get("/", (req, res) => {
    res.send("Hello, Docker!");
});

// GET all todos
app.get("/todos", async (req, res) => {

    // Fetch all todos from MongoDB
    const todos = await Todo.find();

    // Return todos as JSON
    res.json(todos);
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});