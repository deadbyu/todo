// Main start point
function fetchTodos() {
    fetch('/api/todos')
        .then(response => response.json())
        .then(todos => {
            renderTodos(todos);
        });
}   

// Get the list element from the DOM
const list = document.getElementById('todo-list');

function renderTodos(todos) {
    list.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');

        // Create a delete button for each todo item
        const deletebtn = document.createElement('button');
        deletebtn.textContent = 'Delete';
        deletebtn.addEventListener('click', () => {
            fetch(`/api/todos/${todo.id}`, { method: 'DELETE' })
                .then(() => fetchTodos());
        });


        // Create a checkbox for each todo item
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            fetch(`/api/todos/${todo.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: todo.title, completed: checkbox.checked }) })
             .then(() => fetchTodos());
        });


        // Append the checkbox, title, and delete button to the list item
        li.appendChild(checkbox);
        const span = document.createElement('span');
        span.textContent = todo.title;
        li.appendChild(span);

        li.appendChild(deletebtn);
        list.appendChild(li);

    });
}


const input = document.getElementById('todo-input');
const button = document.getElementById('todo-btn');

// Add a new todo when the button is clicked
button.addEventListener('click', () => {
  const title = input.value;
  // Send a POST request to the server to add the new todo
  fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title, completed: false })
  })
    .then(response => response.json())
    .then(newTodo => {
      input.value = '';
      fetchTodos();
    });
});





// Main function call to fetch and render todos when the page loads
fetchTodos();