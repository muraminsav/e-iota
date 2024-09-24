import io from "socket.io-client";
import { server } from "./fetchApi";

const socket = io(server);
// socket.on('connect', () => {
//   console.log(socket.id, ' connected to server');
// });
export { socket };
