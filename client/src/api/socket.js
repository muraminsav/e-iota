import io from "socket.io-client";

const socket = io("https://nxzf7n-3000.csb.app/");
socket.on("connect", () => {
  console.log(socket.id, " connected to server");
});
export { socket };
