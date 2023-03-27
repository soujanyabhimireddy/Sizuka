let todoItemsContainer = document.getElementById("todoItemsContainer");

let todoArray = [];

window.onload = function () {
    let StoredtoDoList = localStorage.getItem("toDoList");
    todoArray = JSON.parse(StoredtoDoList);
    if (todoArray === null) {
        todoArray = [];
    }
    for (let task of todoArray) {
        createAndAppendTodo(task);
    }
}

function onSaveClick() {
    let toDoList = JSON.stringify(todoArray);
    localStorage.setItem("toDoList", toDoList);
}


function onDeleteTodo(todoId) {
    let onDeleteElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(onDeleteElement);
    let index = 0;
    for (let task of todoArray) {
        if (todoId === "todo" + task.uniqueNumber) {
            todoArray.splice(index, 1);
            break;
        }
        index += 1;
    }
}

function onTodoStatusChange(labelId) {
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle("checked");
    let index = 0;
    for (let task of todoArray) {
        if (labelId === "label" + task.uniqueNumber) {
            if (todoArray[index].checked === true) todoArray[index].checked = false;
            else todoArray[index].checked = true;
            console.log(todoArray);
        }
        index += 1;
    }
}

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let newTodo = {}
    if (todoArray.length === 0) {
        newTodo = {
            text: userInputElement.value,
            uniqueNumber: 1,
            checked: false
        }
    }
    else {
        newTodo = {
            text: userInputElement.value,
            uniqueNumber: todoArray[todoArray.length - 1].uniqueNumber + 1,
            checked: false
        }
    }

    todoArray.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

function createAndAppendTodo(todos) {
    let checkboxId = "myCheckbox" + todos.uniqueNumber;
    let todoId = "todo" + todos.uniqueNumber;
    let labelId = "label" + todos.uniqueNumber;

    // Creating li tag (List Items)
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;

    todoItemsContainer.appendChild(todoElement);

    //Creating Input tag
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    if (todos.checked === true) {
        inputElement.setAttribute("checked", "");
    }
    inputElement.onclick = function () {
        onTodoStatusChange(labelId)
    }

    todoElement.appendChild(inputElement);

    //Creating label div
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    labelContainer.id = labelId;
    if (todos.checked === true) {
        labelContainer.classList.add("checked");
    }
    todoElement.appendChild(labelContainer);

    //Creating Label Element
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todos.text;

    labelContainer.appendChild(labelElement);

    //Creating Delete Icon div
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");

    labelContainer.appendChild(deleteIconContainer);

    //Creating Delete Icon
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function () {
        onDeleteTodo(todoId);
    }

    deleteIconContainer.appendChild(deleteIcon);
}