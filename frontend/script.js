const API_URL = "http://localhost:3000/todos";

async function loadTodos() {

    const response = await fetch(API_URL);

    const todos = await response.json();

    console.log(todos);
}

loadTodos();