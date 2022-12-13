let sign_up_form = document.getElementById("sign_up_form");

/** Submit Signup Form */
sign_up_form.addEventListener("submit", submitSignUpForm);

function submitSignUpForm(event){
    event.preventDefault(event);
    let input = document.querySelector(".input");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirm_password = document.getElementById("confirm_password");
    let email_error = document.getElementById("email_error");
    let password_error = document.getElementById("password_error");
    let confirm_password_error = document.getElementById("confirm_password_error");
    let empty_input_error = document.getElementById("empty_input_error");
    
    email_error.classList.add("hidden");
    password_error.classList.add("hidden");
    confirm_password_error.classList.add("hidden");

    var emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var passwordValidRegex=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    /** Check if inputs are not empty */
    if(input.value != ""){

        /** Check if email is valid */
        if(email.value.match(emailValidRegex)){

            /** Check if password is valid*/
            if(password.value.match(passwordValidRegex)){

                /** Check if passwords are identical */
                if (password.value == confirm_password.value){
                    window.location.href = "./index.html";   
                }
                else{
                    confirm_password.classList.add("input_error");
                    confirm_password_error.classList.remove("hidden");
                }
            }
            else{
                password.classList.add("input_error");
                password_error.classList.remove("hidden");
            }
        }
        else{
            email.classList.add("input_error");
            email_error.classList.remove("hidden");
        }
    }
    else{
        email.classList.add("input_error");
        password.classList.add("input_error");
        confirm_password.classList.add("input_error");
        empty_input_error.classList.remove("hidden");
    }
}