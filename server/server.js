import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketSetup } from "./io.js";
const app = express();
// const client = 'http://localhost:5173';
const client = "https://nxzf7n-5173.csb.app";

const origin = {
  origin: client,
  methods: ["POST", "GET"],
};
app.use(express.json());
app.use(cors(origin));
const server = http.createServer(app);
const io = new Server(server, {
  cors: origin,
});

const rooms = new Map();
rooms.set(`ASDA`, {
  id: "",
  isOpen: false,
  players: [],
  boardState: [], // Initial empty board or specific game state
  currentTurn: null, // Player ID or index indicating whose turn it is
  scores: {}, // Player scores
});

// Helper function to generate a random 4-character room ID
function generateRoomId() {
  const newRoomId = Math.random().toString(36).substr(2, 4).toUpperCase();
  if (!rooms[newRoomId]) {
    return newRoomId;
  }
  return generateRoomId();
}

// Endpoint to create a new room and return its ID using POST request
app.post("/create-room", (req, res) => {
  const roomId = generateRoomId();
  rooms.set(`${roomId}`, {
    id: "",
    isOpen: false,
    players: [],
    boardState: [], // Initial empty board or specific game state
    currentTurn: null, // Player ID or index indicating whose turn it is
    scores: {}, // Player scores
  });
  console.log("!!!!!!!!!!!!!!!1", roomId, "from create room endpoint");
  res.json({ roomId });
});

app.get("/list-rooms", (req, res) => {
  const roomList = [];
  rooms.forEach((values) => {
    if (values.isOpen)
      roomList.push({ id: values.id, players: values.players.length });
  });
  res.status(200).json(roomList);
});

app.get("/list-player-in-room/:id", (req, res) => {
  const roomId = req.params.id;
  const playerList = [];
  const room = rooms.get(roomId);
  console.log("roomId:", roomId);
  console.log("room", room);
  room["players"].forEach((values) => {
    console.log("values:", Object.values(values));
    playerList.push(Object.values(values)[0]);
  });
  const playerArray = [];
  playerList.forEach((values) => {
    console.log(values);
    playerArray.push(values.name);
  });
  console.log(playerList, "PlayerList..", playerArray);
  res.status(200).json(playerList);
});

app.get("/find-room/:id", (req, res) => {
  const roomId = req.params.id;

  const room = rooms.get(roomId);

  if (!room) {
    res.status(404).json({
      success: false,
      message: `Room ${roomId} not found`,
    });
  } else if (room.players?.length === 4) {
    res.status(203).json({
      success: false,
      message: `Room ${roomId} is full`,
    });
  } else {
    res.status(200).json({
      success: true,
      message: `Player joined to ${roomId} `,
      room,
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("server running");
});
server.listen(3000, (error) => {
  if (error) {
    throw new Error(error);
  }

  console.log("Backend is running!!");
});
// Socket.IO connection`
socketSetup(io);
export { rooms };
