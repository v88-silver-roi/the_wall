const create_message_button = document.getElementById("create_message_button");
const create_message_modal = document.getElementById("create_message_modal");
const close_message_modal = document.getElementById("close_message_modal");
const cancel_create_message_modal = document.getElementById("cancel_create_message_modal");
const post_message = document.getElementById("post_message");
const no_message = document.getElementById("no_message");
const message_inbox = document.getElementById("message_inbox");
const wall_header_message_length = document.getElementById("wall_header").querySelector("p span");
const delete_message_modal = document.getElementById("delete_message_modal");
const message_length = document.getElementsByClassName("message").length;
const delete_comment_modal = document.getElementById("delete_comment_modal");
const message_input = create_message_modal.querySelector("#create_message_input");

create_message_button.addEventListener("click", (event) => {
    create_message_modal.classList.remove("hidden");
});

close_message_modal.addEventListener("click", (event) => {
    create_message_modal.classList.add("hidden");
    create_message_modal.querySelector("#create_message_input").value = "";
});

cancel_create_message_modal.addEventListener("click", (event) => {
    create_message_modal.classList.add("hidden");
    create_message_modal.querySelector("#create_message_input").value = "";
});

post_message.addEventListener("click", (event) => {
    if(message_input.value != ""){
        const message_clone = document.getElementById("hidden_message_clone").querySelector(".message").cloneNode(true);
        const message_length = document.getElementsByClassName("message").length;
        const message_id = "message_"+message_length;
        message_clone.setAttribute("id", message_id);
        message_clone.querySelector("#message_text").textContent = message_input.value;
        no_message.classList.add("hidden");
        message_inbox.prepend(message_clone);
        create_message_modal.querySelector("#create_message_input").value = "";
        create_message_modal.classList.add("hidden");
        CountMessageLength();

        const edit_message_button = message_clone.querySelector(".message_edit");
        edit_message_button.addEventListener("click", (event) => {
            const current_message_id = edit_message_button.closest(".message").getAttribute("id");
            const selected_message_id = document.getElementById(current_message_id);
            const message = selected_message_id.querySelector("#message_text").textContent;
            selected_message_id.querySelector("#message_text").classList.add("hidden");
            selected_message_id.querySelector(".message_control_list").classList.add("hidden");
            selected_message_id.querySelector(".edit_message_form").classList.remove("hidden");
            selected_message_id.querySelector(".edit_message_input").value = message;
        });

        const update_message_button = message_clone.querySelector(".message_update");
        update_message_button.addEventListener("click", (event) => {
            const current_message_id = edit_message_button.closest(".message").getAttribute("id");
            const selected_message_id = document.getElementById(current_message_id);
            const new_message = selected_message_id.querySelector(".edit_message_input").value;
            selected_message_id.querySelector("#message_text").classList.remove("hidden");
            selected_message_id.querySelector(".message_control_list").classList.remove("hidden");
            selected_message_id.querySelector(".edit_message_form").classList.add("hidden");
            selected_message_id.querySelector("#message_text").textContent = new_message;
        });

        const delete_message_button = message_clone.querySelector(".message_delete");
        delete_message_button.addEventListener("click", (event) => {
            const current_message_id = edit_message_button.closest(".message").getAttribute("id");
            const delete_message_modal = document.getElementById("delete_message_modal");
            delete_message_modal.classList.remove("hidden");
            delete_message_modal.querySelector(".message_id").value = current_message_id;
        });

        const remove_message_button = delete_message_modal.querySelector("#remove_message");
        remove_message_button.addEventListener("click", (event) => {
            const delete_message_modal = document.getElementById("delete_message_modal");
            const current_message_id = delete_message_modal.querySelector(".message_id").value;
            const selected_message_id = document.getElementById(current_message_id);
            selected_message_id.remove();
            delete_message_modal.classList.add("hidden");
            CountMessageLength();
        });

        const add_comment_button = message_clone.querySelector(".message_comment");
        add_comment_button.addEventListener("click", (event) => {
            const current_message_id = add_comment_button.closest(".message").getAttribute("id");
            const selected_message_id = document.getElementById(current_message_id);
            selected_message_id.querySelector(".comment_form").classList.remove("hidden");
            add_comment_button.classList.add("font_color_blue");
            selected_message_id.querySelector("#comment_icon").setAttribute("src","../assets/images/messages-bubble-square-text-blue.png");
            // selected_message_id.querySelector(".comment_input").value = current_message_id;
        });

        const post_comment_button = message_clone.querySelector(".post_comment");
        post_comment_button.addEventListener("click", (event) => {
            const comment_input = message_clone.querySelector(".comment_input");
            const comment_clone = document.getElementById("hidden_comment_clone").querySelector(".comment").cloneNode(true);
            const comment_length = document.getElementsByClassName("comment").length;
            const comment_inbox = document.getElementById("comment_inbox");
            const comment_id = "comment_"+comment_length;
            comment_clone.setAttribute("id", comment_id);
            comment_clone.querySelector("#comment_text").textContent = comment_input.value;
            comment_inbox.prepend(comment_clone);
            comment_input.value = "";
            CountCommentLength();

            const edit_comment_button = message_clone.querySelector(".comment_edit");
            edit_comment_button.addEventListener("click", (event) => {
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
            });

            const update_comment_button = message_clone.querySelector(".update_comment");
            update_comment_button.addEventListener("click", (event) => {
                const current_message_id = edit_comment_button.closest(".message").getAttribute("id");
                const selected_message_id = document.getElementById(current_message_id);
                const comment_form = selected_message_id.querySelector(".comment_form");
                const edit_comment_form = selected_message_id.querySelector(".edit_comment_form");
                const current_comment_id = edit_comment_button.closest(".comment").getAttribute("id");
                const selected_comment_id = document.getElementById(current_comment_id);
                const new_comment = selected_comment_id.querySelector(".edit_comment_input").value;
                comment_form.classList.remove("hidden");
                selected_comment_id.querySelector(".edit_comment_form").classList.add("hidden");
                selected_comment_id.querySelector("#comment_text").classList.remove("hidden");
                selected_comment_id.querySelector(".comment_control_list").classList.remove("hidden");
                selected_comment_id.querySelector("#comment_text").textContent = new_comment;
            });

            const delete_comment_button = message_clone.querySelector(".comment_delete");
            delete_comment_button.addEventListener("click", (event) => {
                const current_comment_id = delete_comment_button.closest(".comment").getAttribute("id");
                const delete_comment_modal = document.getElementById("delete_comment_modal");
                delete_comment_modal.classList.remove("hidden");
                delete_comment_modal.querySelector(".comment_id").value = current_comment_id;
            });

            const remove_comment_button = delete_comment_modal.querySelector("#remove_comment");
            remove_comment_button.addEventListener("click", (event) => {
                const delete_comment_modal = document.getElementById("delete_comment_modal");
                const current_comment_id = delete_comment_modal.querySelector(".comment_id").value;
                const selected_comment_id = document.getElementById(current_comment_id);
                selected_comment_id.remove();
                delete_comment_modal.classList.add("hidden");
                CountCommentLength();
            });
        });

        function CountCommentLength(){
            const comment_length = document.getElementsByClassName("comment").length;
            wall_header_message_length.innerHTML = message_length-1;
        }
    }
    else{
        alert("Please fill up message box");
    }
});

function CountMessageLength(){
    const message_length = document.getElementsByClassName("message").length;
    // wall_header_message_length.innerHTML = message_length-1;
}
