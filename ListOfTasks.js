// Get elements
const todolist = document.querySelector('ul');
const addBtn = document.getElementById('addBtn');
const todoInput = document.getElementById('todoInput');
const prioritySelect = document.getElementById('prioritySelect');

// Load from localStorage or clear if corrupted
let todoArray = [];
const stored = localStorage.getItem('todoArray');

if (stored) {
    try {
        todoArray = JSON.parse(stored);
        // Check if it's in the old format (array of strings)
        if (todoArray.length > 0 && typeof todoArray[0] === 'string') {
            // Old format detected, clear it
            localStorage.clear();
            todoArray = [];
        }
    } catch(e) {
        localStorage.clear();
        todoArray = [];
    }
}

// Use defaults if empty
if (todoArray.length === 0) {
    todoArray = [
        {task: "Do Laundry", priority: "low"},
        {task: "Clean Desk", priority: "mid"},
        {task: "Study Code", priority: "high"}
    ];
}

// Sort and re-render list by priority
function renderList() {
    // Clear the list
    todolist.innerHTML = '';
    
    // Sort by priority: high > mid > low
    const priorityOrder = {high: 0, mid: 1, low: 2};
    todoArray.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    
    // Re-render all items
    todoArray.forEach(item => addItemToList(item.task, item.priority));
}

// Add item to list
function addItemToList(task, priority) {
    const li = document.createElement('li');
    li.textContent = `${task} `;
    li.className = `priority-${priority}`;

    const Prioritytag = document.createElement('button');
    Prioritytag.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
    Prioritytag.className = 'Priority-tag';
    
    // Priority dropdown on click
    Prioritytag.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Create dropdown menu
        const dropdown = document.createElement('select');
        dropdown.className = 'priority-dropdown';
        
        const priorities = ['high', 'mid', 'low'];
        priorities.forEach(p => {
            const option = document.createElement('option');
            option.value = p;
            option.textContent = p.charAt(0).toUpperCase() + p.slice(1);
            option.selected = (p === priority);
            dropdown.appendChild(option);
        });
        
        // Handle priority change
        dropdown.addEventListener('change', function() {
            const newPriority = dropdown.value;
            
            // Update in array
            const item = todoArray.find(i => i.task === task && i.priority === priority);
            if (item) {
                item.priority = newPriority;
                localStorage.setItem('todoArray', JSON.stringify(todoArray));
                renderList(); // Re-render and sort
            }
        });
        
        // Replace button with dropdown
        li.replaceChild(dropdown, Prioritytag);
        dropdown.focus();
    });
    
    li.appendChild(Prioritytag);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'x';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);
    
    // Toggle strikethrough on click
    li.addEventListener('click', function(e) {
        if (!e.target.classList.contains('delete-btn') && !e.target.classList.contains('priority-dropdown')) {
            li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        }
    });
    
    // Delete on button click
    deleteBtn.addEventListener('click', function() {
        // Remove from todoArray
        todoArray = todoArray.filter(item => !(item.task === task && item.priority === priority));
        
        // Save updated array to localStorage
        localStorage.setItem('todoArray', JSON.stringify(todoArray));
        
        // Re-render the entire list
        renderList();
    });
    
    todolist.appendChild(li);
}

// Display all tasks
renderList();

// Add new task
addBtn.addEventListener('click', function() {
    const task = todoInput.value.trim();
    const priority = prioritySelect.value;
    
    if (task === '') {
        alert('Please enter a task');
        return;
    }
    
    // Save to array and localStorage
    todoArray.push({task: task, priority: priority});
    localStorage.setItem('todoArray', JSON.stringify(todoArray));
    
    // Clear input
    todoInput.value = '';
    
    // Delete entire list and re-render in correct order
    renderList();
});