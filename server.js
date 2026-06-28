const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

    socket.on("joinRoom", (data) => {

        socket.join(data.room);

        socket.username = data.username;
        socket.room = data.room;

        io.to(data.room).emit("message", {
            user: "SYSTEM",
            text: data.username + " انضم إلى الغرفة."
        });

    });

    socket.on("chat", (msg) => {

        io.to(socket.room).emit("message", {
            user: socket.username,
            text: msg
        });

    });

    socket.on("disconnect", () => {

        if(socket.room){

            io.to(socket.room).emit("message",{
                user:"SYSTEM",
                text: socket.username + " غادر الغرفة."
            });

        }

    });

});

server.listen(3000,"0.0.0.0",()=>{

    console.log("================================");
    console.log(" CYBER TEAM CHAT");
    console.log(" http://127.0.0.1:3000");
    console.log("================================");

});
