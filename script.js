const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskTime = document.getElementById('task-time');
const taskPriority = document.getElementById('task-priority');
const taskList = document.getElementById('task-list');
const downloadButton = document.getElementById('downloadButton');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item', task.priority);
        
        taskItem.innerHTML = `
            <div>
                <strong>${task.name}</strong> <br>
                <span>${task.date} ${task.time}</span>
            </div>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Add a new task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newTask = {
        name: taskInput.value,
        date: taskDate.value,
        time: taskTime.value,
        priority: taskPriority.value
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    taskDate.value = '';
    taskTime.value = '';
    taskPriority.value = 'low';

    renderTasks();
});

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Generate README.md content
function generateReadmeContent() {
    let content = '# Task Manager\n\n## Tasks\n\n';
    tasks.forEach((task, index) => {
        content += `### Task ${index + 1}\n`;
        content += `- **Task Name**: ${task.name}\n`;
        content += `- **Date**: ${task.date}\n`;
        content += `- **Time**: ${task.time}\n`;
        content += `- **Priority**: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}\n\n`;
    });
    return content;
}

// Download tasks as README.md
downloadButton.addEventListener('click', () => {
    const readmeContent = generateReadmeContent();
    const blob = new Blob([readmeContent], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'README.md';
    link.click();
});

// Initial render of tasks
renderTasks();
