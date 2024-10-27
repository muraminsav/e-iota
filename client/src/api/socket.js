import io from "socket.io-client";
import { server } from "./fetchApi";

const socket = io(server);
socket.on("connect", (data) => {
  console.log(socket.id, "conected in API");
});

export { socket };
