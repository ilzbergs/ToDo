const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
var completedToDo = document.getElementById('completedToDos');
var btn = document.querySelector('button');
var inputOutlineColor = document.querySelector('input');
const todos = JSON.parse(localStorage.getItem('todos'));
const color = JSON.parse(localStorage.getItem('x'));



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
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }
        todoEl.innerText = todoText;

        //add to completed 
        todoEl.addEventListener('click', () => {
            // completedToDo.appendChild(todoEl);
            todoEl.classList.add('completed');
            updateLS();
        });

        //delete to dos
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.classList.add('deleting');
            window.setTimeout(function (e) {
                todoEl.remove();
                updateLS();
            }, 500);


        });
        todosUL.appendChild(todoEl);
        input.value = '';
        updateLS();
    }
}


//localStorage
function updateLS() {
    todosEl = document.querySelectorAll('li');


    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

// random colors for balls
const colors = [];

const numBalls = 100;
const balls = [];

for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.background = colors[Math.floor(Math.random() * colors.length)];
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${Math.random()}em`;
    ball.style.height = ball.style.width;

    balls.push(ball);
    document.body.append(ball);
}

balls.forEach((el, i, ra) => {
    let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),

        y: Math.random() * 5
    };

    let anim = el.animate(
        [
            { transform: "translate(0, 0)" },
            { transform: `translate(${to.x}rem, ${to.y}rem` }
        ],
        {
            duration: (Math.random() + 1) * 2000,
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
        }
    );
});

//color change heading, button and input focus
var h1 = document.getElementById('h1');
h1.addEventListener('click', () => {
    h1.style.color = ColorCode();
    btn.style.backgroundColor = h1.style.color;
    inputOutlineColor.style.outlineColor = h1.style.color;

});
function ColorCode() {
    var makingColorCode = '0123456789ABCDEF';
    var finalCode = '#';
    for (var counter = 0; counter < 6; counter++) {
        finalCode = finalCode + makingColorCode[Math.floor(Math.random() * 16)];
    }
    return finalCode;
}
