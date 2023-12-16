var firstPassword = document.getElementById('password');
var passwordConfirm = document.getElementById('confirm-password');
var submitButton = document.getElementById('sign-up-button')
var userName = document.getElementById('username')

firstPassword.addEventListener("input", checkPassword)
passwordConfirm.addEventListener("input", checkPassword);
userName.addEventListener("input", checkPassword);

function checkPassword() {

    var firstValue = firstPassword.value;
    var secondValue = passwordConfirm.value;

    if ((firstValue == "") && (secondValue == "")) {
        passwordConfirm.style.borderColor = 'black';
        firstPassword.style.borderColor = 'black';

        submitButton.disabled = true;
    }

    else if (firstValue == secondValue) {
        passwordConfirm.style.borderColor = 'green';
        firstPassword.style.borderColor = 'green';

        if (userName.value !== "") {
            submitButton.disabled = false;  
        }
        else {
            submitButton.disabled = true;
        }
    }

    else {
        passwordConfirm.style.borderColor = 'red';
        firstPassword.style.borderColor = 'red';
        
        submitButton.disabled = true;
    }
}