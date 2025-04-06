import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket"], reconnectionAttempts: 5 });

export const sendMessage = (message, userId) => {
  if (socket.connected) {
    socket.emit("send-message", { message, userId });
  }
};

export const receiveMessages = (callback) => {
  socket.on("message", callback);
};

export const disconnectSocket = () => {
  socket.off("message");
  socket.disconnect();
};