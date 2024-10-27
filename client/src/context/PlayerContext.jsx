import { createContext, useReducer, useContext, useEffect } from "react";
import { Player } from "../utility/models";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../utility/helpers";
const initialPlayerState = new Player();

// Create the GameContext
const PlayerContext = createContext();

// Player reducer function
const playerReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PLAYER_NAME":
      // Return a new object with updated player name (ensuring immutability)
      return {
        ...state,
        name: action.payload, // Assuming Player has a name property
      };
    case "UPDATE_SOCKET_ID":
      // Return a new object with updated SOCKETid (ensuring immutability)
      return {
        ...state,
        socketId: action.payload, // Assuming Player has a name property
      };
    case "UPDATE_ROOM_ID":
      // Return a new object with updated room id
      return {
        ...state,

        roomId: action.payload, // Assuming Player has a roomId property
      };
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: action.payload,
      };
    case "TOGGLE_IN_GAME":
      return {
        ...state,
        inGame: !state.inGame,
      };
    default:
      return state;
  }
};

// PlayerProvider component that wraps the children
export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    playerReducer,
    loadStateFromLocalStorage(initialPlayerState)
  );
  useEffect(() => {
    saveStateToLocalStorage(state);
    console.log(state, "playercontext updated");
  }, [state]);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use GameContext easily
export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};
