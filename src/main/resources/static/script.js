
function fetchTodos() {
    fetch('/api/todos')
        .then(response => response.json())
        .then(todos => {
            renderTodos(todos);
        });
}   


const list = document.getElementById('todo-list');

function renderTodos(todos) {
    list.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        list.appendChild(li);
    });
}




fetchTodos();