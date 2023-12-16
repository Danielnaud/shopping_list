function fetching(formData) {
    fetch("", {
        method: "POST",
        body: formData
    });
};

async function sleep(seconds){
    return new Promise((resolve) => setTimeout(resolve, seconds*1000));
};

function redirectToAccount() {
    window.location.href = "/account";
}

var usernameInbox = document.getElementById("username-inbox");

async function changeUsername() {
    if (usernameInbox.disabled == true) {
        usernameInbox.disabled = false;
    } else {
        let formData = new FormData;
        formData.append("whatToDo", "changeUsername");
        formData.append("newUsername", usernameInbox.value);
        formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

        fetching(formData);
        await sleep(0.1);
        location.reload();
    };
};

async function logout() {
    let formData = new FormData;
    formData.append("whatToDo", "logout");
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

    fetching(formData);

    await sleep(0.1);
    location.reload();
};

async function deleteAccount() {
    let formData = new FormData;
    formData.append("whatToDo", "deleteAccount");
    formData.append("csrfmiddlewaretoken", CSRF_TOKEN);

    fetching(formData);

    await sleep(0.1);
    location.reload();
};