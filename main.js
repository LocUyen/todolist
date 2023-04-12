// 2. design data
// let data_task = [
//     {
//         task : "phải tư duy đc cách xử lý",
//         is_complete : true
//     }
// ];

// 3. loadData() && saveData()
const TODOLIST = "TODOLIST";
const saveData = (data) => {
    localStorage.setItem(TODOLIST, JSON.stringify(data));
};
const loadData = () => {
    let data = JSON.parse(localStorage.getItem(TODOLIST));
    data = data ? data : [];
    return data;
};

// 4. addTask
const addTask = (newData) => {
    let data = loadData();
    data = [...data, newData];
    saveData(data);
};


// 5. renderTask()
const renderTask = () => {
    let data = loadData();
    const stacks = document.querySelector("ul#list_stack");
    let count_complete = 0;
    let taskHTML = data.map((element, index) => {
        if(element.is_complete == true) count_complete++;
        return createTaskItem(element.task, index, element.is_complete);
    });
    stacks.innerHTML = taskHTML.join("");
    const task_complete = document.querySelector(".task-finish");
    task_complete.textContent = `Bạn đã hoàn thành ${count_complete} công việc!`;
};

// 6. createTaskItem
const createTaskItem = (task, index, is_complete) =>{
    return `
    <li class="task-item" index="${index}" is_complete="${is_complete}">
        <span id="task" onclick = "markCompleteTask(${index})">${task}</span>
        <div class="task-action">
            <button id="task-edit" class="icon" onclick="pushEditTask(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
            <button id="task-edit" class="icon" onclick="deleteTask(this, ${index})"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </svg>
            </button>

        </div>
    </li> 
    `;
}

// 7. markCompleteTask
const markCompleteTask = (index) => {
    let data = loadData();
    if(data[index].is_complete == false){
        data[index].is_complete = true;
    } else{
        data[index].is_complete = false;
    }
    saveData(data);
    renderTask();
    
}

// 8. deleteTask
const deleteTask = (element, index) => {
    let data = loadData();
    let delete_confirm = confirm('Bạn thật sự muốn xóa không?')
    if (delete_confirm == false) return false;
    data.splice(index, 1);
    saveData(data);
    element.closest('.task-item').remove();
    // renderTask();
}


// 9. edit data

const pushEditTask = (index) => {
    let data = loadData();
    const task = document.querySelector("input#task");
    task.value = data[index].task;
    task.setAttribute('index', index);
    const editBtn = document.querySelector(".addBtn");
    editBtn.textContent = "EDIT TASK";
}
const editTask = (index , task) => {
    let data = loadData();
    data[index].task = task;
    saveData(data);
    const addBtn = document.querySelector(".addBtn");
    addBtn.textContent = "ADD TASK";
}
// -------------------------------------------------------------- //
const formAddTask = document.forms.add_task;
formAddTask.addEventListener("submit", (e) => {
    const task = document.querySelector("input#task");
    const index = task.getAttribute('index');
    if(task.value.length < 2) {
        alert('Phải nhập công việc của bạn');
        return false;
    }
    if(index){
        editTask(index, task.value);
        task.removeAttribute('index');
    } else {
        let newData = {
            task: task.value,
            is_complete: false,
        };
        addTask(newData);
    }
    renderTask();

    task.value = "";
    e.preventDefault();
});

document.addEventListener('keyup', (e) => {
    if(e.which == 27){
    const task = document.querySelector("input#task");
    task.value = "";
    task.removeAttribute('index');
    const addBtn = document.querySelector(".addBtn");
    addBtn.textContent = "ADD TASK";
    }
});
loadData();
renderTask();
