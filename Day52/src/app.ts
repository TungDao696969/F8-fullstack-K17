import express from "express";
import "dotenv/config";
import indexRouter from "./routes/index.route";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(indexRouter);
app.listen(PORT, () => {
  console.log(`Server running with Port: ${PORT}`);
});
