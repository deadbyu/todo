
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

        const deletebtn = document.createElement('button');
        deletebtn.textContent = 'Delete';
        deletebtn.addEventListener('click', () => {
            fetch(`/api/todos/${todo.id}`, { method: 'DELETE' })
                .then(() => fetchTodos());
        });



        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            fetch(`/api/todos/${todo.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: todo.title, completed: checkbox.checked }) })
             .then(() => fetchTodos());
        });



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

button.addEventListener('click', () => {
  const title = input.value;

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






fetchTodos();