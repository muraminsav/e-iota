/* eslint-disable react/prop-types */
// GameContext.js
import { createContext, useReducer, useContext } from 'react';
import { Card, Player, Game, Session } from '../utility/models'; // Adjust import as necessary
const players = [];
const roomId = '';
const deck = [];
const grid = {
  onTable: [
    [[false][true][false]],
    [[true]['anchor'][true]],
    [[false][true][false]],
  ],
  gridGraph: {},
};
const initialGameState = {
  session: new Game(players, roomId, deck, grid),
};

const GameContext = createContext();

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PLAYERS':
      state.setPlayers(action.payload);
      return {
        ...state,
      };
    case 'ADD_PLAYER':
      return {
        ...state,
        players: [...state.players, action.payload],
      };
    case 'REMOVE_PLAYER':
      return {
        ...state,
        players: state.players.filter((player) => {
          player.getSocketID() != action.payload;
        }),
      };
    case 'UPDATE_ROOM_ID':
      return {
        ...state,
        roomId: state.action,
      };
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
