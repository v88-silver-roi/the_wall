const create_message_button = document.getElementById("create_message_button");
const create_message_modal = document.getElementById("create_message_modal");
const post_message = document.getElementById("post_message");
const no_message = document.getElementById("no_message");
const wall_header_message_length = document.getElementById("wall_header").querySelector("h5 span");
const delete_message_modal = document.getElementById("delete_message_modal");
const message_length = document.getElementsByClassName("message").length;
const delete_comment_modal = document.getElementById("delete_comment_modal");
const message_input = create_message_modal.querySelector("#create_message_input");
const close_modal = document.querySelectorAll(".close_modal");

/** Close current modal */
close_modal.forEach(close_modal => {
    close_modal.addEventListener("click", closeModal);

    function closeModal(event){
        event.target.closest(".modal").classList.add("hidden");
    }
});

/** Open message modal */
create_message_button.addEventListener("click", openMessageButton);

/** Check if message input is empty */
message_input.addEventListener("input", checkMessageInput);

/** Post message */
post_message.addEventListener("click", postMessage);

function openMessageButton(){
    create_message_modal.classList.remove("hidden");
}

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
    message_clone.querySelector(".message_text").textContent = message_input.value;
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
    const comment_input = message_clone.querySelector("#create_comment_input");
    const post_comment_button = message_clone.querySelector(".post_comment");
    const current_message_id = message_clone.closest(".message").getAttribute("id");
    const selected_message_id = document.getElementById(current_message_id);

    /** Show edit message form */
    edit_message_button.addEventListener("click", openEditMessageBox);

    /** Save message */
    update_message_button.addEventListener("click", updateMessage);

    /** Show delete message modal */
    delete_message_button.addEventListener("click", openDeleteMessageModal);

    /** Delete message */
    remove_message_button.addEventListener("click", deleteMessage);

    /** Show comment form */
    add_comment_button.addEventListener("click", openCommentBox);
    
    /** Check if comment input is empty */
    comment_input.addEventListener("input", checkCommentInput);

    /** Post comment */
    post_comment_button.addEventListener("click", postComment);
    
    function openEditMessageBox(){
        const message = selected_message_id.querySelector(".message_text").textContent;
        selected_message_id.querySelector(".message_text").classList.add("hidden");
        selected_message_id.querySelector(".message_control_list").classList.add("hidden");
        selected_message_id.querySelector(".edit_message_form").classList.remove("hidden");
        selected_message_id.querySelector(".edit_message_input").value = message;
    }

    function updateMessage(event){
        event.preventDefault(event);
        const new_message = selected_message_id.querySelector(".edit_message_input").value;
        selected_message_id.querySelector(".message_text").classList.remove("hidden");
        selected_message_id.querySelector(".message_control_list").classList.remove("hidden");
        selected_message_id.querySelector(".edit_message_form").classList.add("hidden");
        selected_message_id.querySelector(".message_text").textContent = new_message;
    }

    function openDeleteMessageModal(){
        delete_message_modal.classList.remove("hidden");
        delete_message_modal.querySelector("#delete_message_id").value = current_message_id;
    }

    function deleteMessage(){
        const current_message_id = delete_message_modal.querySelector("#delete_message_id").value;
        document.getElementById("message_inbox").querySelector("#"+current_message_id).remove();
        delete_message_modal.classList.add("hidden");
        countMessageLength();
    }

    function openCommentBox(){
        selected_message_id.querySelector(".comment_form").classList.remove("hidden");
        add_comment_button.classList.add("font_color_blue");
        selected_message_id.querySelector("#comment_icon").setAttribute("src","../assets/images/messages-bubble-square-text-blue.png");
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
        const comment_length = selected_message_id.getElementsByClassName("comment").length;
        const comment_inbox = selected_message_id.querySelector("#comment_inbox");
        const comment_id = "comment_"+comment_length;
        comment_clone.setAttribute("id", comment_id);
        comment_clone.querySelector(".comment_text").textContent = comment_input.value;
        comment_inbox.prepend(comment_clone);
        comment_input.value = "";
        countCommentLength();

        const edit_comment_button = message_clone.querySelector(".comment_edit");
        const update_comment_button = message_clone.querySelector(".update_comment");
        const delete_comment_button = message_clone.querySelector(".comment_delete");
        const remove_comment_button = delete_comment_modal.querySelector("#remove_comment");
        const current_comment_id = edit_comment_button.closest(".comment").getAttribute("id");
        const selected_comment_id = document.getElementById(current_comment_id);
        const comment_form = selected_message_id.querySelector(".comment_form");

        /** Open edit comment form */
        edit_comment_button.addEventListener("click", openEditCommentBox);

        /** Save comment */
        update_comment_button.addEventListener("click", updateComment);

        /** Open delete comment modal */
        delete_comment_button.addEventListener("click", openDeleteCommentBox);

        /** Delete comment */
        remove_comment_button.addEventListener("click", deleteComment);

        function openEditCommentBox(){
            const comment = selected_comment_id.querySelector(".comment_text").textContent;
            comment_form.classList.add("hidden");
            selected_comment_id.querySelector(".edit_comment_form").classList.remove("hidden");
            selected_comment_id.querySelector(".comment_text").classList.add("hidden");
            selected_comment_id.querySelector(".comment_control_list").classList.add("hidden");
            selected_comment_id.querySelector(".edit_comment_input").value = comment;
        }

        function updateComment(event){
            event.preventDefault(event);
            const new_comment = selected_comment_id.querySelector(".edit_comment_input").value;
            comment_form.classList.remove("hidden");
            selected_comment_id.querySelector(".edit_comment_form").classList.add("hidden");
            selected_comment_id.querySelector(".comment_text").classList.remove("hidden");
            selected_comment_id.querySelector(".comment_control_list").classList.remove("hidden");
            selected_comment_id.querySelector(".comment_text").textContent = new_comment;
        }
        
        function openDeleteCommentBox(){
            delete_comment_modal.classList.remove("hidden");
            delete_comment_modal.querySelector("#delete_comment_id").value = current_comment_id;
        }

        function deleteComment(){
            const current_comment_id = delete_comment_modal.querySelector("#delete_comment_id").value;
            const selected_comment_id = document.getElementById(current_comment_id);
            selected_comment_id.remove();
            delete_comment_modal.classList.add("hidden");
            countCommentLength();
        };
    }

    /** Count comment/s */
    function countCommentLength(){ 
        const message_comment_length = selected_message_id.querySelector(".message_comment span");
        comment_length =  selected_message_id.getElementsByClassName("comment").length;
        message_comment_length.innerHTML = comment_length;
    }
}

/** Count message/s */
function countMessageLength(){
    const message_length = document.getElementsByClassName("message").length;
    wall_header_message_length.innerHTML = message_length-1;
    if((message_length-1) == 0){    
        no_message.classList.remove("hidden");
    }
}
