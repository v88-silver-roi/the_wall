let create_message_button = document.getElementById("create_message_button");
let create_message_modal = document.getElementById("create_message_modal");
let post_message = document.getElementById("post_message");
let no_message = document.getElementById("no_message");
let wall_header_message_length = document.getElementById("wall_header").querySelector("h5 span");
let delete_message_modal = document.getElementById("delete_message_modal");
let message_length = document.getElementsByClassName("message").length;
let delete_comment_modal = document.getElementById("delete_comment_modal");
let message_input = create_message_modal.querySelector("#create_message_input");
let close_modal = document.querySelectorAll(".close_modal");
let message_clone = document.getElementById("hidden_message_clone").querySelector(".message").cloneNode(true);
let add_comment_button = message_clone.querySelector(".message_comment");

/** Close current modal */
close_modal.forEach(close_modal => {
    close_modal.addEventListener("click", closeModal);

    function closeModal(event){
        event.target.closest(".modal").classList.add("hidden");
        message_input.value = "";
    }
});

openMessageButton = () => {
    create_message_modal.classList.remove("hidden");
}

function checkMessageInput(){
    let message = message_input.value.trim();

    if(message == ""){
        post_message.classList.add("disabled");
    }
    else{
        post_message.classList.remove("disabled");
    }
}

postMessage = (event) => {
    event.preventDefault(event);
    let message_length = document.getElementsByClassName("message").length;
    let message_id = "message_"+message_length;
    message_clone.setAttribute("id", message_id);
    message_clone.querySelector(".message_text").textContent = message_input.value;
    no_message.classList.add("hidden");
    document.getElementById("message_inbox").prepend(message_clone);
    create_message_modal.querySelector("#create_message_input").value = "";
    create_message_modal.classList.add("hidden");
    countMessageLength(); 

    let edit_message_button = message_clone.querySelector(".message_edit");
    let cancel_message_button = message_clone.querySelector(".cancel_edit_message");
    let update_message_button = message_clone.querySelector(".message_update");
    let delete_message_button = message_clone.querySelector(".message_delete");
    let remove_message_button = delete_message_modal.querySelector("#remove_message");
    let comment_input = message_clone.querySelector("#create_comment_input");
    let post_comment_button = message_clone.querySelector(".post_comment");
    let current_message_id = message_clone.closest(".message").getAttribute("id");
    let selected_message_id = document.getElementById(current_message_id);

    openEditMessageBox = () => {
        let message = selected_message_id.querySelector(".message_text").textContent;
        console.log(message);
        selected_message_id.querySelector(".message_text").classList.add("hidden");
        selected_message_id.querySelector(".message_control_list").classList.add("hidden");
        selected_message_id.querySelector(".edit_message_form").classList.remove("hidden");
        selected_message_id.querySelector(".edit_message_input").value = message;
    }

    closeEditMessageBox = () => {
        selected_message_id.querySelector(".message_text").classList.remove("hidden");
        selected_message_id.querySelector(".message_control_list").classList.remove("hidden");
        selected_message_id.querySelector(".edit_message_form").classList.add("hidden");
    }

    updateMessage = (event) => {
        event.preventDefault(event);
        let new_message = selected_message_id.querySelector(".edit_message_input").value;
        selected_message_id.querySelector(".message_text").classList.remove("hidden");
        selected_message_id.querySelector(".message_control_list").classList.remove("hidden");
        selected_message_id.querySelector(".edit_message_form").classList.add("hidden");
        selected_message_id.querySelector(".message_text").textContent = new_message;
    }

    openDeleteMessageModal = () => {
        delete_message_modal.classList.remove("hidden");
        delete_message_modal.querySelector("#delete_message_id").value = current_message_id;
    }

    deleteMessage = () => {
        let current_message_id = delete_message_modal.querySelector("#delete_message_id").value;
        document.getElementById("message_inbox").querySelector("#"+current_message_id).remove();
        delete_message_modal.classList.add("hidden");
        countMessageLength();
    }

    openCommentBox = () => {
        selected_message_id.querySelector(".comment_form").classList.toggle("hidden");
        countCommentLength();
        // selected_message_id.querySelector(".comment_form").classList.remove("hidden");
        // add_comment_button.classList.add("font_color_blue");
        // selected_message_id.querySelector("#comment_icon").setAttribute("src","../assets/images/messages-bubble-square-text-blue.png");
    }

    toggleCommentBox = () => {

    }

    function checkCommentInput(){
        let comment = comment_input.value.trim();
        let post_comment = document.getElementById("post_comment");

        if(comment == ""){
            post_comment.classList.add("disabled");
        }
        else{
            post_comment.classList.remove("disabled");
        }
    }

    postComment = (event) => {
        event.preventDefault(event);
        let comment_input = message_clone.querySelector(".comment_input");
        let comment_clone = document.getElementById("hidden_comment_clone").querySelector(".comment").cloneNode(true);
        let comment_length = selected_message_id.getElementsByClassName("comment").length;
        let comment_inbox = selected_message_id.querySelector("#comment_inbox");
        let comment_id = "comment_"+comment_length;
        comment_clone.setAttribute("id", comment_id);
        comment_clone.querySelector(".comment_text").textContent = comment_input.value;
        comment_inbox.prepend(comment_clone);
        comment_input.value = "";
        countCommentLength();

        let edit_comment_button = message_clone.querySelector(".comment_edit");
        let cancel_comment_button = message_clone.querySelector(".cancel_edit_comment");
        let update_comment_button = message_clone.querySelector(".update_comment");
        let delete_comment_button = message_clone.querySelector(".comment_delete");
        let remove_comment_button = delete_comment_modal.querySelector("#remove_comment");
        let current_comment_id = edit_comment_button.closest(".comment").getAttribute("id");
        let selected_comment_id = document.getElementById(current_comment_id);
        let comment_form = selected_message_id.querySelector(".comment_form");

        openEditCommentBox = () => {
            let comment = selected_comment_id.querySelector(".comment_text").textContent;
            selected_comment_id.querySelector(".edit_comment_form").classList.remove("hidden");
            selected_comment_id.querySelector(".comment_text").classList.add("hidden");
            selected_comment_id.querySelector(".comment_control_list").classList.add("hidden");
            selected_comment_id.querySelector(".edit_comment_input").value = comment;
        }

        closeEditCommentBox = () => {
            selected_comment_id.querySelector(".edit_comment_form").classList.add("hidden");
            selected_comment_id.querySelector(".comment_text").classList.remove("hidden");
            selected_comment_id.querySelector(".comment_control_list").classList.remove("hidden");
        }

        updateComment = (event) => {
            event.preventDefault(event);
            let new_comment = selected_comment_id.querySelector(".edit_comment_input").value;
            comment_form.classList.remove("hidden");
            selected_comment_id.querySelector(".edit_comment_form").classList.add("hidden");
            selected_comment_id.querySelector(".comment_text").classList.remove("hidden");
            selected_comment_id.querySelector(".comment_control_list").classList.remove("hidden");
            selected_comment_id.querySelector(".comment_text").textContent = new_comment;
        }
        
        openDeleteCommentBox = () => {
            delete_comment_modal.classList.remove("hidden");
            delete_comment_modal.querySelector("#delete_comment_id").value = current_comment_id;
        }

        deleteComment = () => {
            let current_comment_id = delete_comment_modal.querySelector("#delete_comment_id").value;
            let selected_comment_id = document.getElementById(current_comment_id);
            selected_comment_id.remove();
            delete_comment_modal.classList.add("hidden");
            countCommentLength();
        };

        /** Open edit comment form */
        edit_comment_button.addEventListener("click", openEditCommentBox);

        /** Close edit comment form */
        cancel_comment_button.addEventListener("click", closeEditCommentBox);

        /** Save comment */
        update_comment_button.addEventListener("click", updateComment);

        /** Open delete comment modal */
        delete_comment_button.addEventListener("click", openDeleteCommentBox);

        /** Delete comment */
        remove_comment_button.addEventListener("click", deleteComment);
    }

    /** Count comment/s */
    function countCommentLength(){ 
        let message_comment_length = selected_message_id.querySelector(".message_comment span");
        comment_length =  selected_message_id.getElementsByClassName("comment").length;
        message_comment_length.innerHTML = comment_length;
        if((comment_length) == 0){    
            add_comment_button.classList.remove("font_color_blue");
        }
        else{
            add_comment_button.classList.add("font_color_blue");
        }
    }

    /** Show edit message form */
    edit_message_button.addEventListener("click", openEditMessageBox);

    /** Close edit message form */
    cancel_message_button.addEventListener("click", closeEditMessageBox);

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
}

/** Count message/s */
function countMessageLength(){
    let message_length = document.getElementsByClassName("message").length;
    wall_header_message_length.innerHTML = message_length-1;
    if((message_length-1) == 0){    
        no_message.classList.remove("hidden");
    }
}

/** Open message modal */
create_message_button.addEventListener("click", openMessageButton);

/** Check if message input is empty */
message_input.addEventListener("input", checkMessageInput);

/** Post message */
post_message.addEventListener("click", postMessage);
