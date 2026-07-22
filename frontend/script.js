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

    // Loop through every todo
    todos.forEach(todo => {

        // Create a new list item (<li>)
        const li = document.createElement("li");

        // Display the todo title
        li.textContent = todo.title;

        // Add the list item to the page
        todoList.appendChild(li);
    });

}

// Load todos when the page opens
loadTodos();

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addTodo);

async function addTodo() {

    const todoInput = document.getElementById("todoInput");

    const title = todoInput.value;

    console.log(title);

}