import express from "express";
import { dbConnect } from "./db.connect.js";
import userRoutes from "./user/user.route.js";
import productRoutes from "./product/product.route.js";

const app = express();
// to make app understand json
app.use(express.json());

// db connection
dbConnect();

// register routes
app.use(userRoutes);
app.use(productRoutes);

const port = 4000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
