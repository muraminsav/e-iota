/* eslint-disable react/prop-types */

import { createContext, useReducer, useContext } from 'react';
import { Game } from '../utility/models'; // Adjust import as necessary
import io from 'socket.io-client';

// Initialize socket connection
const socket = io('http://localhost:3001');

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

const SocketContext = createContext();

const socketReducer = (state, action) => {
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

export const SocketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(socketReducer, initialGameState);
  useEffect(() => {
    socket.on('gridUpdate', (newGrid) => {
      dispatch({ type: 'SET_GRID', payload: newGrid });
    });

    socket.on('error', (errorMessage) => {
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    });

    return () => {
      socket.off('gridUpdate');
      socket.off('error');
    };
  }, []);
  return (
    <SocketContext.Provider value={{ state, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useGameContext = () => useContext(SocketContext);
