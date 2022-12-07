const email = document.getElementById("email");
const password = document.getElementById("password");
const login_form = document.getElementById("login_form");
const email_error = document.getElementById("email_error");
const password_error = document.getElementById("password_error");

login_form.addEventListener("submit", (event) => {
    event.preventDefault(event);
    if(email.value == "test@gmail.com" && password.value == "12345"){
        window.location.href = "./wall.html";
    }
    else{
        if(email.value != "test@gmail.com"){
            email.classList.add("input_error");
            email_error.classList.remove("hidden");
        }
        else{
            password.classList.add("input_error");
            password_error.classList.remove("hidden");
        }
    }
});