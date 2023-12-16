var signUpLink = document.getElementById("link-to-signup")
var userName = document.getElementById("username")
var password = document.getElementById("password")
var loginButton = document.getElementById("login-button")

signUpLink.addEventListener("click", function redirectToSignUp(event) {
    event.preventDefault();
    window.location.href = "/signup";
});

userName.addEventListener("input", checkIfEmpty);
password.addEventListener("input", checkIfEmpty);

function checkIfEmpty() {
    if (userName.value == "" || password.value == "") {
        loginButton.disabled = true;
    } else {
        loginButton.disabled = false;
    }
}