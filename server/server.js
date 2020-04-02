const express = require("express");
const http = require("http").Server(express);
const socketio = require("socket.io")(http);

let users = new Map();
let connectedUsers = 0;

http.listen(3000, () => {
  console.log("Listening at port 3000...");
});

socketio.on("connection", socket => {
  socket.emit("new_user", "New user");

  socket.on("username_set", username => {
    addUser(socket, username);
    console.log(`Connected users: ${connectedUsers}`);
  });

  socket.on("disconnect", reason => {
    users.delete(socket.id);
    connectedUsers--;
    console.log(users);
    console.log(`Connected users: ${connectedUsers}`);
  });
});

let addUser = (socket, data) => {
  users.set(socket.id, data);
  connectedUsers++;
};
