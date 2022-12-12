const login_form = document.getElementById("login_form");

/** Submit Login Form */
login_form.addEventListener("submit", submitLogin);

function submitLogin(event){
    event.preventDefault(event);
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const email_error = document.getElementById("email_error");
    const password_error = document.getElementById("password_error");
    
    email_error.classList.add("hidden");
    password_error.classList.add("hidden");

    /** Check if email and password is equal to a user */
    if(email.value == "test@gmail.com" && password.value == "12345"){
        window.location.href = "./wall.html";
    }
    else{
        if(email.value != "test@gmail.com" ){
            email.classList.add("input_error");
            email_error.classList.remove("hidden");
        }
        if(password.value != "12345" ){
            password.classList.add("input_error");
            password_error.classList.remove("hidden");
        }
    }
}