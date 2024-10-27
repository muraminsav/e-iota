// src/db.js

import { Redis } from "ioredis";
import { generateDeck, pickOne, returnCards } from "./models";

const redis = new Redis(); // Connect to Redis

// Function to add user to Redis
const addUser = async (userId, username, roomId) => {
  try {
    const user = {
      id: userId,
      name: username,
      score: 0,
      hand: "",
      roomId: roomId,
    };
    await redis.hmset(`user:${userId}`, user);
  } catch (error) {
    console.error("Error adding user:", error);
    throw error; // Rethrow for handling upstream
  }
};
const updateScore = async (userId, inrcement) => {
  await redis.hincrby(`user:${userId}`, "score", inrcement);
};

const updateHand = async (userId, newHand) => {
  await redis.hset(`user:${userId}`, "hand", JSON.stringify(newHand));
};

// Function to get user from Redis
const getUser = async (userId) => {
  try {
    const user = await redis.hgetall(`user:${userId}`);
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error; // Rethrow for handling upstream
  }
};

// Function to retrieve users and scores from game room
const getAllScores = async (roomId) => {
  try {
    // Get the room data
    const players = await redis.hget(`room:${roomId}`, "playersId");

    // Check if the room exists and has players
    if (!players) {
      return []; // Return an empty array if the room doesn't exist or has no players
    }

    const userArray = players.split(","); // Assuming playersId is a list of user IDs
    const scoreArray = [];

    // Using for...of to await each score retrieval
    for (const userId of userArray) {
      const user = await redis.hgetall(`user:${userId}`);
      if (user) {
        scoreArray.push({ [user["name"]]: user["score"] });
      } else {
        scoreArray.push({ [user["name"]]: null }); // Or skip this user entirely
      }
    }

    return scoreArray; // Return the array of user scores
  } catch (error) {
    console.error("Error fetching scores:", error);
    throw error; // Rethrow the error for handling upstream
  }
};

// Function to create a room and set room data in Redis
const createRoom = async (roomId) => {
  const deck = generateDeck();
  const ancore = pickOne(deck);
  const initialGrid = (grid = [
    [false, true, false],
    [true, ancore, true],
    [false, true, false],
  ]);
  try {
    const roomData = {
      id: roomId,
      isOpen: true, // Initialize as open
      ancore: JSON.stringify(ancore),
      playersId: null, // Initialize with no players
      boardState: JSON.stringify(initialGrid), // Initial empty board
      currentTurn: null, // No current turn at creation
      deck: JSON.stringify([
        { color: "joker", shape: "joker", number: 0, id: 0 },
        { color: "joker", shape: "joker", number: 0, id: 1 },
        ...deck,
      ]), // Initial deck
      numberOfPlayers: 0,
    };

    // Store the room data in Redis
    await redis.hmset(`room:${roomId}`, roomData);
  } catch (error) {
    console.error("Error creating room:", error);
    throw error; // Rethrow for handling upstream
  }
};

//Requesr card from deck
const dealCards = async (roomId, amount) => {
  const cards = [];
  const currentDeck = await redis
    .hget(`room:${roomId}`, "deck")
    .then((d) => JSON.parse(d));
  for (amount; amount > 0; amount--) {
    const card = pickOne(currentDeck);
    cards.push(card);
  }
  return cards;
};
//Return cards to deck
const returnCards = async (roomId, cards) => {};
// Function to update game state in Redis
const updateGameState = async (roomId, boardState, currentTurn) => {
  try {
    await redis.hmset(`room:${roomId}`, {
      boardState: JSON.stringify(boardState),
      currentTurn: currentTurn,
    });
  } catch (error) {
    console.error("Error updating game state:", error);
    throw error; // Rethrow for handling upstream
  }
};

// Function to get room info
const getRoomInfo = async (roomId) => {
  try {
    const roomInfo = await redis.hgetall(`room:${roomId}`);
    return roomInfo;
  } catch (error) {
    console.error("Error getting room info:", error);
    throw error; // Rethrow for handling upstream
  }
};

// Function to add a player to the room
const addPlayerToRoom = async (roomId, playerId) => {
  try {
    const playerCount = await redis.hget(`room:${roomId}`, "numberOfPlayers");
    if ((playerCount = 4)) throw new Error(`Room ${roomId} is full`);

    const players = await redis.hget(`room:${roomId}`, "playersId");
    const updatedPlayers = players ? players + "," + playerId : playerId; // Ensure we initialize players correctly
    await redis.hset(`room:${roomId}`, "players", updatedPlayers);
    await redis.hincrby(`room:${roomId}`, "numberOfPlayers", 1);
  } catch (error) {
    console.error("Error adding player to room:", error);
    throw error; // Rethrow for handling upstream
  }
};

// Function to remove a player from the room
const removePlayerFromRoom = async (roomId, playerId) => {
  try {
    const players = await redis.hget(`room:${roomId}`, "players");
    if (players) {
      const updatedPlayers = players
        .split(",")
        .filter((player) => player !== playerId)
        .join(",");
      await redis.hset(`room:${roomId}`, "players", updatedPlayers);
    }
  } catch (error) {
    console.error("Error removing player from room:", error);
    throw error; // Rethrow for handling upstream
  }
};

// Function to toggle room open/close state
const toggleRoomState = async (roomId) => {
  try {
    const room = await redis.hgetall(`room:${roomId}`);
    if (room) {
      const newState = !JSON.parse(room.isOpen); // Toggle the isOpen state
      await redis.hset(`room:${roomId}`, "isOpen", newState);
    }
  } catch (error) {
    console.error("Error toggling room state:", error);
    throw error; // Rethrow for handling upstream
  }
};

export {
  addUser,
  createRoom,
  updateGameState,
  getRoomInfo,
  removePlayerFromRoom,
  toggleRoomState,
  getAllScores,
  getUser,
  addPlayerToRoom,
  dealCards,
  returnCards,
};
