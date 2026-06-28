const socket = io();

let username = "";
let room = "";

function join() {

    username = document.getElementById("username").value.trim();
    room = document.getElementById("room").value;

    if (username === "") {
        alert("اكتب اسم المستخدم");
        return;
    }

    socket.emit("joinRoom", {
        username: username,
        room: room
    });

    document.querySelector(".login").style.display = "none";
    document.getElementById("chat").style.display = "flex";

    document.getElementById("roomName").innerText = "ROOM " + room;
}

function send() {

    const input = document.getElementById("msg");
    const text = input.value.trim();

    if (text === "") return;

    socket.emit("chat", text);

    input.value = "";
}

socket.on("message", (data) => {

    const messages = document.getElementById("messages");

    const div = document.createElement("div");
    div.className = "message";

    div.innerHTML =
        "<b>" + data.user + "</b><br>" +
        data.text;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        send();
    }
});
