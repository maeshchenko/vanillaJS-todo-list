//define UI vars
const form = document.querySelector('form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
  //DOM Load Event
  document.addEventListener('DOMContentLoaded',getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click',removeTask);
  //clear tasks event
  clearBtn.addEventListener('click',clearTasks);
  //filter tasks event
  filter.addEventListener('keyup',filterTasks);
}

//get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };

  tasks.forEach(function(task,index){
    // create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create textNode and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append attr with number
    li.setAttribute('num',index);

    //append li to ul
    taskList.appendChild(li);
  })
}

//add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task!');
  }else{
    // create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create textNode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //add task to LS
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';
  }

  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };

  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Удалить задачу?')){
      e.target.parentElement.parentElement.remove();

      //remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from localStorage
function removeTaskFromLocalStorage(taskItem, index){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };
  
  tasks.forEach(function(task, index){
    if((taskItem.textContent === task) && (+taskItem.getAttribute('num') === index)){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks(e){
  if(confirm('Удалить все задачи?')){
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    };
    //clear tasks from LS
    clearTasksFromLocalStorage();
  }
}

//clear tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
};

//filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block'
    }else{
      task.style.display = 'none'
    }
  })

  console.log(text);
  
}
