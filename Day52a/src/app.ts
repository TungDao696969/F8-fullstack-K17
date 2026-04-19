import express from "express";
import authRoutes from "./routes/index";
import "dotenv/config";
import http from "http";
import { initSocket } from "./socket/socket";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use(authRoutes);
const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
export default app;
