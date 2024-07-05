function addTask() { //onclick addtask par lgaya hai
    var newTaskInput = document.getElementById('new-task'); // Input field ka reference
    var taskText = newTaskInput.value.trim(); // Input value ko trim karta hai (extra spaces remove karta hai)
    
    if (taskText) { // Agar input field empty nahi hai
        var task = createTaskElement(taskText); // Nayi task element create karta hai
        document.getElementById('todo-tasks').appendChild(task); // "To Do" column mein task ko add karta hai
        newTaskInput.value = ''; // Input field ko clear karta hai
    }
}


function createTaskElement(taskText) {
    var task = document.createElement('div'); // Nayi div element create karta hai
    task.className = 'task'; // task class assign karta hai
    task.textContent = taskText; // Task ka text set karta hai
    task.draggable = true; // Task ko draggable banata hai
    
    task.ondragstart = function (e) {
        e.dataTransfer.setData('text/plain', taskText); // Task text ko data transfer mein set karta hai
        e.dataTransfer.setData('parentId', task.parentNode.id); // Parent id ko data transfer mein set karta hai
    };
    
    return task; // Task element return karta hai
}


function handleDrop(e) {
    e.preventDefault(); // Default browser action ko prevent karta hai
    
    var taskText = e.dataTransfer.getData('text/plain'); // Drag data se task text retrieve karta hai
    var parentId = e.dataTransfer.getData('parentId'); // Drag data se parent id retrieve karta hai
    
    var newTask = createTaskElement(taskText); // Nayi task element create karta hai
    
    var parent = document.getElementById(parentId); // Parent element ka reference leta hai
    var tasks = parent.getElementsByClassName('task'); // Parent ke under sab tasks ka array leta hai
    
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].textContent === taskText) { // Agar task text match karta hai
            parent.removeChild(tasks[i]); // Task ko remove karta hai
            break;
        }
    }
    
    e.target.appendChild(newTask); // Nayi column mein task ko add karta hai
}


function handleDragOver(e) {
    e.preventDefault(); // Default browser action ko prevent karta hai
}

function setupColumns() {
    var columns = ['todo-tasks', 'in-progress-tasks', 'done-tasks']; // Columns ke IDs ka array
    
    for (var i = 0; i < columns.length; i++) {
        var column = document.getElementById(columns[i]); // Column ka reference leta hai
        column.ondrop = handleDrop; // Drop event listener set karta hai
        column.ondragover = handleDragOver; // Drag over event listener set karta hai
    }
}

window.onload = setupColumns; // Page load hone par setupColumns function call karta hai