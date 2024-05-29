document.addEventListener('DOMContentLoaded', () => {
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const taskDueDateInput = document.getElementById('taskDueDate');
    const addTaskButton = document.getElementById('addTaskButton');
    const filterTitleInput = document.getElementById('filterTitle');
    const filterDueDateInput = document.getElementById('filterDueDate');
    const sortTasks = document.getElementById('sortTasks');
    const showAllTasksButton = document.getElementById('showAllTasksButton');
    const taskList = document.getElementById('taskList');
    
    let tasks = [];

    addTaskButton.addEventListener('click', () => {
        const title = taskTitleInput.value;
        const description = taskDescriptionInput.value;
        const dueDate = taskDueDateInput.value;
        
        if (title && dueDate) {
            tasks.push({ title, description, dueDate });
            taskTitleInput.value = '';
            taskDescriptionInput.value = '';
            taskDueDateInput.value = '';
            filterAndSortTasks();
        } else {
            alert('Task title and due date are required!');
        }
    });

    filterTitleInput.addEventListener('input', filterAndSortTasks);
    filterDueDateInput.addEventListener('input', filterAndSortTasks);
    sortTasks.addEventListener('change', filterAndSortTasks);
    showAllTasksButton.addEventListener('click', showAllTasks);

    function filterAndSortTasks() {
        let filteredTasks = tasks;

        const filterTitle = filterTitleInput.value.toLowerCase();
        const filterDueDate = filterDueDateInput.value;

        if (filterTitle) {
            filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(filterTitle));
        }

        if (filterDueDate) {
            filteredTasks = filteredTasks.filter(task => task.dueDate === filterDueDate);
        }

        filteredTasks = sortTasksList(filteredTasks);
        displayTasks(filteredTasks);
    }

    function sortTasksList(tasks) {
        const sortBy = sortTasks.value;
        return tasks.sort((a, b) => {
            if (sortBy === 'alphabetical') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'reverseAlphabetical') {
                return b.title.localeCompare(a.title);
            } else if (sortBy === 'soonest') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else if (sortBy === 'latest') {
                return new Date(b.dueDate) - new Date(a.dueDate);
            }
        });
    }

    function displayTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due: ${task.dueDate}</p>
            `;
            taskList.appendChild(taskElement);
        });
    }

    function showAllTasks() {
        filterTitleInput.value = '';
        filterDueDateInput.value = '';
        sortTasks.value = 'alphabetical';
        displayTasks(sortTasksList(tasks));
    }
});
