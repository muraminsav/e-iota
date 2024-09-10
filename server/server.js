import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const origin = {};
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5173', methods: ['POST', 'GET'] }));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    methods: ['POST', 'GET'],
  },
});

const rooms = new Map();

// Helper function to generate a random 4-character room ID
function generateRoomId() {
  return Math.random().toString(36).substr(2, 4).toUpperCase();
}

// Endpoint to create a new room and return its ID using POST request
app.post('/create-room', (req, res) => {
  const roomId = generateRoomId();
  rooms.set(roomId, {
    players: [],
    boardState: [], // Initial empty board or specific game state
    currentTurn: null, // Player ID or index indicating whose turn it is
    scores: {}, // Player scores
  });
  res.json({ roomId });
});

const data = {
  name: 'me',
  age: 12,
};
app.get('/', (req, res) => {
  res.status(200).send({ data });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('a user connected');

  // Join room event
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, (error) => {
  if (error) {
    throw new Error(error);
  }

  console.log('Backend is running!!');
});
