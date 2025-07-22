let todoForm = document.querySelector('#todo-form');
let todoList = document.querySelector('#todo-list');
let todoInput = document.querySelector('#todo-input');
let filterButtons = document.querySelectorAll('#filters button');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const renderTasks = () => {
    todoList.innerHTML = '';
    tasks.forEach((task) => {
        let li = document.createElement('li');
        li.innerHTML = `
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}')">
                    <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">${task.text}</span>
                    <button onclick="deleteTask('${task.id}')">Delete</button>
                `;
        todoList.appendChild(li);
    });
}
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
const addTask = (text) => {
    const task = {
        id: Date.now().toString(),
        text: text,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
}
const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}
const deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTask(text);
        todoInput.value = '';
    }
});
renderTasks();
document.querySelector('#filters').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const filter = e.target.getAttribute('data-filter');
        let filteredTasks = [];
        if (filter === 'completed') {
            filteredTasks = tasks.filter(t => t.completed);
        } else if (filter === 'pending') {
            filteredTasks = tasks.filter(t => !t.completed);
        } else {
            filteredTasks = tasks;
        }
        todoList.innerHTML = '';
        filteredTasks.forEach((task) => {
            let li = document.createElement('li');
            li.innerHTML = `
                        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}')">
                        <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">${task.text}</span>
                        <button onclick="deleteTask('${task.id}')">Delete</button>
                    `;
            todoList.appendChild(li);
        });
    }
});
window.addEventListener('beforeunload', () => {
    saveTasks();
});
window.addEventListener('load', () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();
});
window.addEventListener('beforeunload', saveTasks); 