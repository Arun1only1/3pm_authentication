import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";

const router = express.Router();

let products = [];

router.post("/product/add", async (req, res) => {
  const authorization = req.headers.authorization;
  const splittedToken = authorization.split(" ");
  const token = splittedToken[1];

  //   decrypt the token

  let userEmail;
  try {
    const decryptedValue = jwt.verify(
      token,
      "kdafdjkasfdkadjfajfjkdfkakdjkafkjdkafdkj32413"
    );

    userEmail = decryptedValue.email;
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized user." });
  }

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized user." });
  }

  const newProduct = req.body;

  products.push(newProduct);

  return res.status(201).send({ message: "Product added." });
});

router.get("/products", (req, res) => {
  return res.status(200).send(products);
});

export default router;
