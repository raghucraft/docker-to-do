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

        // Display the todo title
        li.textContent = todo.title;

        // Create Delete button
        const deleteBtn = document.createElement("button");

        // Set button text
        deleteBtn.textContent = "Delete";

        // Delete todo when button is clicked
        deleteBtn.addEventListener("click", async () => {

            await fetch(`${API_URL}/${todo._id}`, {
                method: "DELETE"
            });

            // Reload the todo list
            loadTodos();

        });

        // Add button inside the <li>
        li.appendChild(deleteBtn);

        // Add the <li> to the page
        todoList.appendChild(li);

    });
}

// Load todos when the page opens
loadTodos();

// Find the Add button
const addBtn = document.getElementById("addBtn");

// Run addTodo() when button is clicked
addBtn.addEventListener("click", addTodo);

// Add a new todo
async function addTodo() {

    const todoInput = document.getElementById("todoInput");

    const title = todoInput.value;

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