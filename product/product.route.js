import express from "express";
import { isUser } from "../middleware/auth.middleware.js";
import { Product } from "./product.model.js";

const router = express.Router();

// add product
router.post("/product/add", isUser, async (req, res) => {
  const newProduct = req.body;
  newProduct.sellerId = req.userData._id;

  await Product.create(newProduct);
  return res.status(201).send({ message: "Product added." });
});

// get all products
router.get("/products", isUser, async (req, res) => {
  const products = await Product.find();
  return res.status(200).send(products);
});

export default router;
