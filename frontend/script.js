// API endpoint.
// Nginx forwards "/todos" to the backend.
const API_URL = "/todos";

// Load all todos from the backend
async function loadTodos() {

    // Send GET request
    const response = await fetch(API_URL);

    // Convert JSON response to JavaScript objects
    const todos = await response.json();

    // Find the unordered list (<ul>) element
    const todoList = document.getElementById("todoList");

    // Remove old list items
    todoList.innerHTML = "";

    todos.forEach(todo => {

        // Create a new list item (<li>)
        const li = document.createElement("li");

        // Create a span to hold the todo text
        const todoText = document.createElement("span");
        todoText.textContent = todo.title;

        // Show completed todos with a line through them
        todoText.style.textDecoration = todo.completed
            ? "line-through"
            : "none";

        // Add the todo text to the list item
        li.appendChild(todoText);

        // Create button container
        const buttonGroup = document.createElement("div");
        buttonGroup.className = "button-group";

        // Create Complete / Undo button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = todo.completed
            ? "Undo"
            : "Complete";

        completeBtn.addEventListener("click", async () => {

            await fetch(`${API_URL}/${todo._id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    completed: !todo.completed
                })

            });

            // Reload the todo list
            loadTodos();

        });

        // Create Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", async () => {

            await fetch(`${API_URL}/${todo._id}`, {

                method: "DELETE"

            });

            // Reload the todo list
            loadTodos();

        });

        // Add buttons to the button container
        buttonGroup.appendChild(completeBtn);
        buttonGroup.appendChild(deleteBtn);

        // Add button container to the todo item
        li.appendChild(buttonGroup);

        // Add the <li> to the page
        todoList.appendChild(li);

    });

}

// Load todos when the page opens
loadTodos();

// Find the Add button
const addBtn = document.getElementById("addBtn");

// Find the input box
const todoInput = document.getElementById("todoInput");

// Run addTodo() when button is clicked
addBtn.addEventListener("click", addTodo);

// Run addTodo() when Enter is pressed
todoInput.addEventListener("keydown", function (event) {

    // Check if the Enter key was pressed
    if (event.key === "Enter") {

        // Prevent the browser's default action
        event.preventDefault();

        // Add the todo
        addTodo();

    }

});

// Add a new todo
async function addTodo() {

    const title = todoInput.value.trim();

    // Prevent empty or whitespace-only todos
    if (title === "") {

        // Show an error message to the user
        alert("Todo cannot be empty.");

        // Stop the function so no POST request is sent
        return;

    }

    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            title: title,
            completed: false

        })

    });

    // Clear the input box
    todoInput.value = "";

    // Reload the todo list
    loadTodos();

}