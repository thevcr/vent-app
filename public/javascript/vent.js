const { text } = require("express");

const ventMessage = document.getElementById('Vent_Text');
const ventSubmit = document.getElementById('Submit_Vent');

//Create A Vent 
const  ventPostHandler = async (event) => {
    event.preventDefault();

    const ventTitleHandler = ventTitle.vent.trim();
    const ventMessageHandler = ventMessage.value.trim();

    if(ventTitleHandler === 0 || text.length === 0) {
        error.Text.text.Content= "Fill out all fields!"
        return
    }

    const response = await fetch("/api/Vent",{
        method: "POST",
        body: JSON.stringify({
            title: title,
            text: text,
        }),
        headers: {"Content-Type": "application/json"},
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    }
};

ventSubmit.addEventListener("click", handlePostSubmit);