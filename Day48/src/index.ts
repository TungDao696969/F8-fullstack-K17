import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./routes/product.routers";
const app = express();

app.use(express.json());
app.use("/products", router);
app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
