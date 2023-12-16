async function sleep(seconds){
    return new Promise((resolve) => setTimeout(resolve, seconds*1000));
};

function fetching(formData) {
    fetch("", {
        method: "POST",
        body: formData
    });
};

var newItem = document.getElementById("add-new-item");
var finalAddButton = document.getElementById("final-add-button");
var quantity = document.getElementById("quantity-input");

async function addItem() {
    let itemName = document.getElementById('add-new-item').value;
    let formData = new FormData();
    formData.append("whatToDo", "addItem");
    formData.append("itemName", itemName);
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

    fetching(formData);

    await sleep(0.1);
    location.reload();
};
async function deleteItem(objectId) {
    let formData = new FormData();
    formData.append("whatToDo", "deleteItem")
    formData.append("id", objectId);
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

    fetching(formData);

    await sleep(0.1);
    location.reload();
};
function checkBoxes(objectId, htmlId) {
    let checkbox = document.getElementById(htmlId);
    let formData = new FormData();
    formData.append("whatToDo", "changeCheckbox");
    formData.append("id", objectId);
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);
    if (checkbox.checked) {
        formData.append("done", "True");
    } else {
        formData.append("done", "False");
    }

    fetching(formData);
};

function changeQuantity(objectId) {
    let formData = new FormData();
    formData.append("whatToDo", "changeQuantity");
    formData.append("quantity", quantity.value);
    formData.append("id", objectId);
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

    fetching(formData);
};

newItem.addEventListener("input", function checkIfEmpty() {
    if (newItem.value == "") {
        finalAddButton.disabled = true;
    } else {
        finalAddButton.disabled = false;
    }
});
