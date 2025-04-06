import { Server } from "socket.io";

export const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};