// Card
import { v4 as uuidv4 } from "uuid";
class Card {
  constructor(id, inHand, coordinate, face, neighbors) {
    this.id = id;
    this.inHand = inHand;
    this.coordinate = coordinate;
    this.face = face; // { color: 'blue', shape: 'square', value: 4 }
    this.neighbors = neighbors; // { right: null, left: null, top: null, bottom: null }
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getInHand() {
    return this.inHand;
  }

  setInHand(inHand) {
    this.inHand = inHand;
  }

  getCoordinate() {
    return this.coordinate;
  }

  setCoordinate(coordinate) {
    this.coordinate = coordinate;
  }

  getFace() {
    return this.face;
  }

  setFace(face) {
    this.face = face;
  }

  getNeighbors() {
    return this.neighbors;
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }
}

// Player
class Player {
  constructor(
    name,
    isMyTurn,
    socketId,
    score,
    hand,
    playedCards,
    roomId,
    darkMode = false,
    inGame = false
  ) {
    this.name = name;
    this.isMyTurn = isMyTurn;
    this.socketId = socketId;
    this.score = score;
    this.hand = hand; // Array of Card
    this.playedCards = playedCards; // Array of Card
    this.roomId = roomId;
    this.darkMode = darkMode;
    this.inGame = false;
    this.playerId = uuidv4();
  }
  getRoomId() {
    return this.roomID;
  }
  setRoomId(roomId) {
    this.roomId = roomId;
  }
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getIsMyTurn() {
    return this.isMyTurn;
  }

  setIsMyTurn(isMyTurn) {
    this.isMyTurn = isMyTurn;
  }

  getSocketId() {
    return this.socketId;
  }

  setSocketId(socketId) {
    this.socketId = socketId;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  getHand() {
    return this.hand;
  }

  setHand(hand) {
    this.hand = hand;
  }

  getPlayedCards() {
    return this.playedCards;
  }

  setPlayedCards(playedCards) {
    this.playedCards = playedCards;
  }
}

// Game
class Game {
  constructor(currentPlayerIndex, players, gameId, grid) {
    this.players = players; // Array of joined Player
    this.currentPlayerIndex = currentPlayerIndex; //player Client
    this.gameId = gameId;
    // this.deck = deck; // Array of Card
    this.grid = grid; // Grid with card placement
  }

  getPlayers() {
    return this.players;
  }

  setPlayers(players) {
    this.players = players;
  }

  getGameId() {
    return this.gameId;
  }

  setGameId(gameId) {
    this.gameId = gameId;
  }

  getDeck() {
    return this.deck;
  }

  setDeck(deck) {
    this.deck = deck;
  }

  getGrid() {
    return this.grid;
  }

  setGrid(grid) {
    this.grid = grid;
  }
}

// Session
class Session {
  constructor(isPublic, roomId, players, gameState) {
    this.isPublic = isPublic;
    this.roomId = roomId;
    this.players = players; // Array of Player
    this.gameState = gameState; // Instance of Game
  }

  getIsPublic() {
    return this.isPublic;
  }

  setIsPublic(isPublic) {
    this.isPublic = isPublic;
  }

  getRoomId() {
    return this.roomId;
  }

  setRoomId(roomId) {
    this.roomId = roomId;
  }

  getPlayers() {
    return this.players;
  }

  setPlayers(players) {
    this.players = players;
  }

  getGameState() {
    return this.gameState;
  }

  setGameState(gameState) {
    this.gameState = gameState;
  }
}

export { Card, Player, Game, Session };
