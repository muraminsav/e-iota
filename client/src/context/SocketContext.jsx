/* eslint-disable react/prop-types */

import { createContext, useReducer, useContext, useEffect } from "react";
import io from "socket.io-client";
import { server } from "../api/fetchApi";
import { socket } from "../api/socket";

export const SocketContext = createContext();

const initialState = {
  socket: socket,
  isAuthenticated: false,
  user: null,
  message: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CONNECT_SOCKET":
      return { ...state, socket: action.payload };
    case "SET_AUTHENTICATED_USER":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "DISCONNECT_SOCKET":
      return { ...state, isAuthenticated: false, user: null, socket: null };
    case "MESSAGE_IN":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export const SocketProvider = ({ children }) => {
  const [socketState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Connect to the server on initial load
    const socket = io(server, {
      // withCredentials: true, // Send cookies (JWT stored in HttpOnly cookie)
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      dispatch({ type: "CONNECT_SOCKET", payload: socket });
    });

    socket.on("authenticated", (data) => {
      if (data.success) {
        console.log("User authenticated:", data);
        dispatch({ type: "SET_AUTHENTICATED_USER", payload: data });
      } else {
        console.log("Authentication failed");
      }
    });
    socket.on("message", (message) => {
      alert(message);
      dispatch({ type: "MESSAGE_IN", payload: message });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      dispatch({ type: "DISCONNECT_SOCKET" });
    });

    return () => {
      if (socket)
        socket.disconnect(() => {
          console.log(socket.id, "socket Disconnetct component dissmount");
        });
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socketState }}>
      {children}
    </SocketContext.Provider>
  );
};
