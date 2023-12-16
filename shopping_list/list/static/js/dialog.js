function openDialog(dialogId) {
    document.getElementById(dialogId).classList.add("visible");
    document.getElementById("body-overlay").classList.add("visible");
}

function closeDialog(dialogId) {
    document.getElementById(dialogId).classList.remove("visible");
    document.getElementById("body-overlay").classList.remove("visible");
}