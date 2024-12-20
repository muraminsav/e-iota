import { useContext, useEffect, useState } from "react";
// import socket from '..App/';
import JoinGame from "./JoinGame";
import { SocketContext } from "../context/SocketContext";
import { server } from "../api/fetchApi";
import { usePlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import MessageSelector from "../components/MessageSelector";

export function GameRoom() {
  const { state, dispatch } = usePlayerContext();

  const navigate = useNavigate();

  const { socketState } = useContext(SocketContext);
  const { socket, isAuthenticated, user } = socketState;

  const handelClick = () => {
    dispatch({ type: "TOGGLE_IN_GAME" });
    dispatch({ type: "UPDATE_ROOM_ID", payload: null });
    socket.emit("leave-room", state.roomId);
    navigate("/");
  };

  useEffect(() => {
    dispatch({ type: "UPDATE_SOCKET_ID", payload: socket.id });
  }, []);

  if (!state.inGame) {
    return <JoinGame />;
  } else
    return (
      <>
        <h1>GameRoom</h1>
        <h2>
          player {state.name} ;{state.socketId}
        </h2>
        <button
          onClick={() => handelClick()}
          className=" bg-grey-200 dark:bg-slate-800 dark:text-white m-2 p-3 border-2 rounded-lg  hover:bg-gray-300 dark:hover:bg-slate-700 "
        >
          Leave game
        </button>
        <button
          onClick={() => {
            console.log(state);
            fetch(`${server}/list-player-in-room/${state.roomId}`, {
              method: "GET",
            });
          }}
        >
          log state
        </button>
        <MessageSelector />
      </>
    );
}
