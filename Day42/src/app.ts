import express from "express";
import authRoutes from "./routes/auth.routes";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
