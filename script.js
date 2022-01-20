const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
var completed = document.getElementById('completed');
var btn = document.getElementById('add');
const todos = JSON.parse(localStorage.getItem('todos'));


if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');
      
        todoEl.innerText = todoText;

        todoEl.addEventListener('click', () => {
           

            completed.appendChild(todoEl);
            todoEl.classList.add('completed');

            updateLS();
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);
      
        input.value = '';
         updateLS();
    }
}

function updateLS() {
    var todosEl = document.querySelectorAll('li');

    const todos = [];
   

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));

   
}