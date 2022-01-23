const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
var completedToDo = document.getElementById('completedToDos');
var btn = document.getElementById('add');
const todos = JSON.parse(localStorage.getItem('todos'));
const color = JSON.parse(localStorage.getItem('color'));



if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
});
//add To Dos
function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');
        // if (todo && todo.completed) {
        //     todoEl.classList.add('completed');
        // }
        todoEl.innerText = todoText;

        //add to completed   completedToDo.appendChild(todoEl)To Dos
        todoEl.addEventListener('click', () => {

            completedToDo.appendChild(todoEl);
            todoEl.classList.add('completed');
            updateLS();
        });

        //delete to dos
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
//color change heading
var h1 = document.getElementById('h1');
h1.addEventListener('click', () => {
    h1.style.color = ColorCode();
});

function ColorCode() {
    var makingColorCode = '0123456789ABCDEF';
    var finalCode = '#';
    for (var counter = 0; counter < 6; counter++) {
        finalCode = finalCode + makingColorCode[Math.floor(Math.random() * 16)];
    }
    return finalCode;
}


//localStorage
function updateLS() {
    var todosEl = document.querySelectorAll('li');
    console.log(todosEl);

    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));


    var colorChange = document.querySelectorAll('h1');
    console.log(colorChange);
    localStorage.setItem('color', JSON.stringify(colorChange));



}








