async function sleep(seconds){
    return new Promise((resolve) => setTimeout(resolve, seconds*1000));
};

function fetching(formData) {
    fetch("", {
        method: "POST",
        body: formData
    });
};

var newList = document.getElementById("add-new-list");
var newUser = document.getElementById("add-new-user");
var listAddButton = document.getElementById("final-add-button-list");
var userAddButton = document.getElementById("final-add-button-user");

var listIdForAddUser;

function setListIdForAddUser(listId) {
    listIdForAddUser = listId;
};

async function addList() {
    let formData = new FormData();
    formData.append("whatToDo", "createList");
    formData.append("listName", newList.value);
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

    fetching(formData);

    await sleep(0.1);
    location.reload();
};

async function deleteList(listId) {
    let formData = new FormData();
    formData.append("whatToDo", "deleteList");
    formData.append("id", listId);
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

    fetching(formData);

    await sleep(0.1);
    location.reload();
};

function selectList(listId) {
    let formData = new FormData();
    formData.append("whatToDo", "selectList");
    formData.append("id", listId);
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

    fetching(formData);
    
    window.location.href = "/list";
};

async function addUser(listId=listIdForAddUser) {
    let formData = new FormData();
    formData.append("whatToDo", "addUserToList");
    formData.append("username", newUser.value);
    formData.append("listId", listId);
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

    fetching(formData);

    await sleep(0.1);
    location.reload();
};

async function removeUser(listId, userId) {
    let formData = new FormData();
    formData.append("whatToDo", "removeUserFromList");
    formData.append("userId", userId);
    formData.append("listId", listId);
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

    fetching(formData);

    await sleep(0.1);
    location.reload();
};

newList.addEventListener("input", function() {
    checkIfEmpty(newList, listAddButton);
});

newUser.addEventListener("input", function() {
    checkIfEmpty(newUser, userAddButton);
});

function checkIfEmpty(inputBox, addButton) {
    if (inputBox.value == "") {
        addButton.disabled = true;
    } else {
        addButton.disabled = false;
    }
};