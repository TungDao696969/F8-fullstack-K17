import { Server } from "socket.io";
import { COIN_PRICES_CHANNEL, createRedisClient } from "../utils/redis";
import jwt from "jsonwebtoken";

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  const subscriber = createRedisClient();

  subscriber.subscribe(COIN_PRICES_CHANNEL);

  // check jwt
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      // gắn user vào socket
      (socket as any).user = decoded;

      next();
    } catch (err) {
      return next(new Error("Invalid token"));
    }
  });

  subscriber.on("message", (channel, message) => {
    if (channel !== COIN_PRICES_CHANNEL) {
      return;
    }

    const data = JSON.parse(message);
    io.emit(COIN_PRICES_CHANNEL, data);
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  });
};
