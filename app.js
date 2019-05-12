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
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click',removeTask);
  //clear tasks event
  clearBtn.addEventListener('click',clearTasks)
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

    //clear input
    taskInput.value = '';
  }

  e.preventDefault();
}

//remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
    }
  }
}

//clear tasks
function clearTasks(e){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}