
const todolist = document.querySelector('ul');


// delete button

function addDeleteButton(listItem) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.className = 'delete-btn';
        listItem.appendChild(deleteBtn);
};

todolist.addEventListener('click', function(e){
    
    if (e.target.classList.contains('delete-btn')){
        
        e.target.parentElement.remove();
        return;
    }

    if(e.target.tagName === 'LI'){
        if (e.target.style.textDecoration === 'line-through'){
            e.target.style.textDecoration = 'none';
           
        } else {
            e.target.style.textDecoration = 'line-through';
        }
    }
});

document.querySelectorAll('li').forEach(item => {
    addDeleteButton(item);
});

const addBtn = document.getElementById ('addBtn');
const todoInput = document.getsElementById('todoInput');
//const todoArray = ["do laundry", "clean desk", 22];

/*function printlist(todoArray) {
    for (let i = 0; i < todoArray.length; i++){

        const li = document.createElement('li');
        li.textContent = todoArray(i);
        todolist.appendChild(li);
    }
}*/

//todoArray.forEach(printlist);

addBtn.addEventListener('click', function(){
    
    const newTask = todoInput.value;

    const li = document.createElement('li');
    li.textContent = newTask;
    addDeleteButton(li);
    
    todolist.appendChild(li);
    todoInput.value = '';

    /*if (newTask !== ''){
        const li = document.createElement('li');
        li.textContent = newTask;
        
        todoArray.push(newTask);
    }*/
    
});