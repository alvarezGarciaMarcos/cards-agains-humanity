const express = require("express");
const http = require("http").Server(express);
const socketio = require("socket.io")(http);
const cards = require("../src/assets/cards.json");
const blackCards = cards.blackCards;

let connectedUsers = 0;

http.listen(3000, () => {
  console.log("Listening at port 3000...");
});

let pickBlackCard = () => {
  return blackCards[Math.floor(Math.random() * blackCards.length)];
};
let blackCard = pickBlackCard();
var rooms = new Map();
let sockets = new Map();
let plays = new Map();
let alreadyPickedUsers = new Map();
socketio.on("connection", socket => {
  socket.on("username_set", data => {
    addUser(socket, data);
  });

  socket.on("redirect_to_game", () => {
    let roomName = sockets.get(socket.id);
    socketio.to(roomName).emit("redirect_to_game", {});
    pickNextPlayer(roomName);
  });

  socket.on("card_picked", play => {
    let roomName = sockets.get(play.user.id);
    let plays = addPlay(play, roomName);
    let numberOfPlays = Array.from(plays).length;
    let numberOfPlayers = Array.from(getUsersForRoom(roomName)).length;
    socketio.to(roomName).emit("card_picked", play);
    if (numberOfPlayers === numberOfPlays)
      socketio.to(roomName).emit("finish_round", {});
  });

  socket.on("black_card_set", card => {
    let roomName = sockets.get(socket.id);
    socketio.to(roomName).emit("black_card_set", card);
  });

  socket.on("disconnect", reason => {
    let roomName = sockets.get(socket.id);
    rooms.get(roomName).delete(socket.id);
    socketio
      .to(roomName)
      .emit("update_all_users", Array.from(rooms.get(roomName)));
    connectedUsers--;
  });
});

let addUser = (socket, data) => {
  let room = data.room;
  let username = data.username;
  let usersForRoom;
  sockets.set(socket.id, room);
  socket.join(room);
  if (!rooms.get(room)) {
    rooms.set(room, new Map());
  }
  usersForRoom = rooms.get(room);
  usersForRoom.set(socket.id, { id: socket.id, username: username });
  socket.emit("current_user", usersForRoom.get(socket.id));
  socketio.to(room).emit("update_all_users", Array.from(usersForRoom));
  connectedUsers++;
};

let addPlay = (play, roomName) => {
  if (!plays.get(roomName)) plays.set(roomName, []);
  plays.get(roomName).push(play);
  return plays.get(roomName);
};

let getUsersForRoom = roomName => {
  return rooms.get(roomName);
};

let getUserInARoom = (roomName, socketId) => {
  let room = getUsersForRoom(roomName);
  return room.get(socketId);
};

let startTimer = roomName => {
  let countdown = 10;
  setInterval(function() {
    countdown--;
    if (countdown >= 0) socketio.to(roomName).emit("timer_update", countdown);
    else if (countdown === -1) socketio.to(roomName).emit("time_up", {});
  }, 1000);
};

let pickNextPlayer = roomName => {
  let arrayOfUsers = Array.from(getUsersForRoom(roomName));
  let users = arrayOfUsers
    .map(user => user[1])
    .filter(user => !alreadyPickedUsers.has(user.id));
  let pickedUser = users[Math.floor(Math.random() * users.length)];
  alreadyPickedUsers.set(pickedUser.id, pickedUser);
  socketio.to(roomName).emit("next_player", pickedUser);
  socketio.to(pickedUser.id).emit("I_am_master_player", {});
};
