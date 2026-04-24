import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.route";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;
