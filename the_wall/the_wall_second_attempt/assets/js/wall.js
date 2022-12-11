const create_message_button = document.getElementById("create_message_button");
const create_message_modal = document.getElementById("create_message_modal");
const close_message_modal = document.getElementById("close_message_modal");
const cancel_create_message_modal = document.getElementById("cancel_create_message_modal");
const post_message = document.getElementById("post_message");
const no_message = document.getElementById("no_message");
const wall_header_message_length = document.getElementById("wall_header").querySelector("h5 span");
const delete_message_modal = document.getElementById("delete_message_modal");
const message_length = document.getElementsByClassName("message").length;
const delete_comment_modal = document.getElementById("delete_comment_modal");
const message_input = create_message_modal.querySelector("#create_message_input");
const modal = document.querySelector(".modal");

// document.querySelectorAll(".close_modal").addEventListener("click", closeModal);

create_message_button.addEventListener("click", openMessageButton);
// close_message_modal.addEventListener("click", closeModal);
// cancel_create_message_modal.addEventListener("click", closeModal);
message_input.addEventListener("input", checkMessageInput);
post_message.addEventListener("click", postMessage);

function openMessageButton(){
    create_message_modal.classList.remove("hidden");
}

// function closeMessageModal(){
//     create_message_modal.classList.add("hidden");
//     create_message_modal.querySelector("#create_message_input").value = "";
// }

function checkMessageInput(){
    const message = message_input.value.trim();

    if(message == ""){
        post_message.classList.add("disabled");
    }
    else{
        post_message.classList.remove("disabled");
    }
}

function postMessage(event){
    event.preventDefault(event);
    const message_clone = document.getElementById("hidden_message_clone").querySelector(".message").cloneNode(true);
    const message_length = document.getElementsByClassName("message").length;
    const message_id = "message_"+message_length;
    message_clone.setAttribute("id", message_id);
    message_clone.querySelector("#message_text").textContent = message_input.value;
    no_message.classList.add("hidden");
    document.getElementById("message_inbox").prepend(message_clone);
    create_message_modal.querySelector("#create_message_input").value = "";
    create_message_modal.classList.add("hidden");
    countMessageLength(); 

    const edit_message_button = message_clone.querySelector(".message_edit");
    const update_message_button = message_clone.querySelector(".message_update");
    const delete_message_button = message_clone.querySelector(".message_delete");
    const remove_message_button = delete_message_modal.querySelector("#remove_message");
    const add_comment_button = message_clone.querySelector(".message_comment");
    const post_comment_button = message_clone.querySelector(".post_comment");
    const comment_input = message_clone.querySelector("#create_comment_input");

    edit_message_button.addEventListener("click", openEditMessageBox);
    update_message_button.addEventListener("click", updateMessage);
    delete_message_button.addEventListener("click", openDeleteMessageModal);
    remove_message_button.addEventListener("click", deleteMessage);
    add_comment_button.addEventListener("click", openCommentBox);
    comment_input.addEventListener("input", checkCommentInput);
    post_comment_button.addEventListener("click", postComment);
    
    function openEditMessageBox(){
        const current_message_id = edit_message_button.closest(".message").getAttribute("id");
        const selected_message_id = document.getElementById(current_message_id);
        const message = selected_message_id.querySelector("#message_text").textContent;
        selected_message_id.querySelector("#message_text").classList.add("hidden");
        selected_message_id.querySelector(".message_control_list").classList.add("hidden");
        selected_message_id.querySelector(".edit_message_form").classList.remove("hidden");
        selected_message_id.querySelector(".edit_message_input").value = message;
    }

    function updateMessage(){
        const current_message_id = edit_message_button.closest(".message").getAttribute("id");
        const selected_message_id = document.getElementById(current_message_id);
        const new_message = selected_message_id.querySelector(".edit_message_input").value;
        selected_message_id.querySelector("#message_text").classList.remove("hidden");
        selected_message_id.querySelector(".message_control_list").classList.remove("hidden");
        selected_message_id.querySelector(".edit_message_form").classList.add("hidden");
        selected_message_id.querySelector("#message_text").textContent = new_message;
    }

    function openDeleteMessageModal(){
        const current_message_id = edit_message_button.closest(".message").getAttribute("id");
        const delete_message_modal = document.getElementById("delete_message_modal");
        delete_message_modal.classList.remove("hidden");
        delete_message_modal.querySelector(".message_id").value = current_message_id;
    }

    function deleteMessage(){
        const delete_message_modal = document.getElementById("delete_message_modal");
        const current_message_id = delete_message_modal.querySelector(".message_id").value;
        document.getElementById(current_message_id).remove();
        delete_message_modal.classList.add("hidden");
        console.log(message_length);
        countMessageLength();
    }

    function openCommentBox(){
        const current_message_id = add_comment_button.closest(".message").getAttribute("id");
        const selected_message_id = document.getElementById(current_message_id);
        selected_message_id.querySelector(".comment_form").classList.remove("hidden");
        add_comment_button.classList.add("font_color_blue");
        selected_message_id.querySelector("#comment_icon").setAttribute("src","../assets/images/messages-bubble-square-text-blue.png");
        // selected_message_id.querySelector(".comment_input").value = current_message_id;
    }

    function checkCommentInput(){
        const comment = comment_input.value.trim();
        const post_comment = document.getElementById("post_comment");

        if(comment == ""){
            post_comment.classList.add("disabled");
        }
        else{
            post_comment.classList.remove("disabled");
        }
    }

    function postComment(event){
        event.preventDefault(event);
        const comment_input = message_clone.querySelector(".comment_input");
        const comment_clone = document.getElementById("hidden_comment_clone").querySelector(".comment").cloneNode(true);
        const comment_length = document.getElementsByClassName("comment").length;
        const comment_inbox = document.getElementById("comment_inbox");
        const comment_id = "comment_"+comment_length;
        comment_clone.setAttribute("id", comment_id);
        comment_clone.querySelector("#comment_text").textContent = comment_input.value;
        comment_inbox.prepend(comment_clone);
        comment_input.value = "";
        // countCommentLength();

        const edit_comment_button = message_clone.querySelector(".comment_edit");
        const update_comment_button = message_clone.querySelector(".update_comment");
        const delete_comment_button = message_clone.querySelector(".comment_delete");
        const remove_comment_button = delete_comment_modal.querySelector("#remove_comment");
        close_message_modal.addEventListener("click", closeModal);
        cancel_create_message_modal.addEventListener("click", closeModal);

        edit_comment_button.addEventListener("click", openEditCommentBox);
        update_comment_button.addEventListener("click", updateComment);
        delete_comment_button.addEventListener("click", openDeleteCommentBox);
        remove_comment_button.addEventListener("click", deleteComment);

        function openEditCommentBox(){
            const current_message_id = edit_comment_button.closest(".message").getAttribute("id");
            const selected_message_id = document.getElementById(current_message_id);
            const comment_form = selected_message_id.querySelector(".comment_form");
            const current_comment_id = edit_comment_button.closest(".comment").getAttribute("id");
            const selected_comment_id = document.getElementById(current_comment_id);
            const comment = selected_comment_id.querySelector("#comment_text").textContent;
            comment_form.classList.add("hidden");
            selected_comment_id.querySelector(".edit_comment_form").classList.remove("hidden");
            selected_comment_id.querySelector("#comment_text").classList.add("hidden");
            selected_comment_id.querySelector(".comment_control_list").classList.add("hidden");
            selected_comment_id.querySelector(".edit_comment_input").value = comment;
        }

        function updateComment(){
            const current_message_id = edit_comment_button.closest(".message").getAttribute("id");
            const selected_message_id = document.getElementById(current_message_id);
            const comment_form = selected_message_id.querySelector(".comment_form");
            const current_comment_id = edit_comment_button.closest(".comment").getAttribute("id");
            const selected_comment_id = document.getElementById(current_comment_id);
            const new_comment = selected_comment_id.querySelector(".edit_comment_input").value;
            comment_form.classList.remove("hidden");
            selected_comment_id.querySelector(".edit_comment_form").classList.add("hidden");
            selected_comment_id.querySelector("#comment_text").classList.remove("hidden");
            selected_comment_id.querySelector(".comment_control_list").classList.remove("hidden");
            selected_comment_id.querySelector("#comment_text").textContent = new_comment;
        }
        
        function openDeleteCommentBox(){
            const current_comment_id = delete_comment_button.closest(".comment").getAttribute("id");
            const delete_comment_modal = document.getElementById("delete_comment_modal");
            delete_comment_modal.classList.remove("hidden");
            delete_comment_modal.querySelector(".comment_id").value = current_comment_id;
        }

        function deleteComment(){
            const delete_comment_modal = document.getElementById("delete_comment_modal");
            const current_comment_id = delete_comment_modal.querySelector(".comment_id").value;
            const selected_comment_id = document.getElementById(current_comment_id);
            selected_comment_id.remove();
            delete_comment_modal.classList.add("hidden");
            // countCommentLength();
        };
    }

    // function countCommentLength(){
    //     // const current_message_id = .closest(".message").getAttribute("id");
    //     const selected_message_id = document.getElementById(current_message_id);
    //     comment_length =  selected_message_id.getElementsByClassName("comment").length;
    //     // wall_header_message_length.innerHTML = message_length-1;
    //     console.log(comment_length);
    // }
}

function closeModal(){
    modal.classList.add("hidden");
}

function countMessageLength(){
    const message_length = document.getElementsByClassName("message").length;
    wall_header_message_length.innerHTML = message_length-1;
    if((message_length-1) == 0){    
        no_message.classList.remove("hidden");
    }
}
