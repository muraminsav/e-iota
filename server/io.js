import { rooms } from "./server.js";
const socketSetup = (io) => {
  io.on("connect", (socket) => {
    console.log("a user connected");
    console.log(rooms);
    console.log(io.sockets.adapter.rooms);

    // Join room event

    socket.on("join-room", (roomId, name) => {
      const roomToJoin = rooms.get(roomId);
      socket.join(roomId);
      const playerId = socket.id;
      const pName = {};
      pName[playerId] = { name: name };
      rooms.set(roomId, {
        ...rooms.get(roomId),
        id: roomId,
        players: [...rooms.get(roomId)["players"], pName],
        isOpen: true,
      });
      console.log(
        `User ${socket.id} joined room: ${roomId} in  ${io.sockets.adapter.rooms}`
      );

      console.log(io.sockets.adapter.rooms);
      console.dir(rooms, { depth: null });
    });

    //leave room event
    socket.on("leave-room", (roomId) => {
      const gameRoom = rooms.get(roomId);
      console.log(gameRoom);
      const filteredPlayers =
        gameRoom &&
        gameRoom["players"].filter(
          (player) => Object.keys(player)[0] != socket.id
        );
      rooms.set(roomId, {
        ...rooms.get(roomId),
        players: filteredPlayers,
      });
      console.dir(rooms, { depth: null });
    });
    socket.on("message", (message) => {
      const roomId = Array.from(socket.rooms);
      console.log(roomId, "message sent in room", message);
      socket.to(roomId[1]).emit("message", message);
    });
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(socket.id, " user  disconnected");
    });
  });
};
export { socketSetup };
