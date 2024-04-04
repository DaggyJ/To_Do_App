//VARIABLES
const openTaskformBtn =document.getElementById("open-task-form-btn");
const taskform =document.getElementById("task-form");
const closeTaskformBtn =document.getElementById("close-task-form-btn");
const titleInput =document.getElementById("title-input");
const dateInput =document.getElementById("date-input");
const descriptionInput =document.getElementById("description-input");
const addOrUpdateTaskBtn =document.getElementById("add-or-update-task-btn");
const confirmCloseDialog =document.getElementById("confirm-close-dialog");
const cancelBtn =document.getElementById("cancel-btn");
const discardBtn =document.getElementById("discard-btn");
const taskContainer =document.getElementById("task-container");
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};


//FUNCTIONS
const addOrUpdateTask = () =>{
    addOrUpdateTaskBtn.innerHTML = "Add Task"
   
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
//generateId
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

if(dataArrIndex === -1){
    taskData.unshift(taskObj);
}   else{
    taskData[dataArrIndex] = taskObj;
}

localStorage.setItem("data", JSON.stringify(taskData));
updateTaskContainer();
reset();
};

const updateTaskContainer = ()=>{
    taskContainer.innerHTML = "";
    taskData.forEach(({id, title, date, description})=>{
        taskContainer.innerHTML += `
        <div class="task" id="${id}">
        <p><strong>Title:</strong>${title}</p>
        <p><strong>Date:</strong>${date}</p>
        <p><strong>Description:</strong>${description}</p>
        <button type="button" onclick="editTask(this)" class="btn" >Edit</button>
        <button type="button" onclick="deleteTask(this)" class="btn">Delete</button>
        </div>
        `;
    });
};

const editTask = (buttonEl)=>{
    const dataArrIndex=taskData.findIndex(item=>item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();

    currentTask = taskData[dataArrIndex];

    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;

    addOrUpdateTaskBtn.innerHTML = "Update Task";
    taskform.classList.toggle("hidden");
};

const deleteTask = (buttonEl)=>{
    const dataArrIndex=taskData.findIndex(item=>item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);


    localStorage.setItem("data", JSON.stringify(taskData));

};

const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    taskform.classList.toggle("hidden");
    currentTask = {};
};

if(taskData.length){
    updateTaskContainer();
};

//EVENTLISTENERS
openTaskformBtn.addEventListener("click",()=>{
    taskform.classList.toggle("hidden"); //toggle add or removes
});

closeTaskformBtn.addEventListener("click",()=> {

    const formInputContainValues = 
    titleInput.value || dateInput.value || descriptionInput.value;
    const formInputValuesUpdates = 
    titleInput.value !== currentTask.title  || 
    dateInput.value !== currentTask.date || 
    descriptionInput.value !== currentTask.description ;

        if(formInputContainValues && formInputValuesUpdates){
            confirmCloseDialog.showModal();
        } else {
            reset();
        }
   
});

cancelBtn.addEventListener("click",()=>{
    confirmCloseDialog.close();
});

discardBtn.addEventListener("click",()=>{
    confirmCloseDialog.close();
    reset();
});

taskform.addEventListener("submit",(e)=>{
    e.preventDefault();
    addOrUpdateTask();
    //console.log(e);
  
//console.log(taskData)

    
});