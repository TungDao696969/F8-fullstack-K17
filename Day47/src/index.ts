import express from "express";
import productRoutes from "./routers/product.router";
import { errorHandler } from "./middlewares/error.middleware";
const app = express();

app.use(express.json());

app.use("/api", productRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
