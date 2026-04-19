"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const redis_1 = require("../utils/redis");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: { origin: "*" },
    });
    const subscriber = (0, redis_1.createRedisClient)();
    subscriber.subscribe(redis_1.COIN_PRICES_CHANNEL);
    // check jwt
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) {
            return next(new Error("Unauthorized"));
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // gắn user vào socket
            socket.user = decoded;
            next();
        }
        catch (err) {
            return next(new Error("Invalid token"));
        }
    });
    subscriber.on("message", (channel, message) => {
        if (channel !== redis_1.COIN_PRICES_CHANNEL) {
            return;
        }
        const data = JSON.parse(message);
        io.emit(redis_1.COIN_PRICES_CHANNEL, data);
    });
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
    });
};
exports.initSocket = initSocket;
//# sourceMappingURL=socket.js.map