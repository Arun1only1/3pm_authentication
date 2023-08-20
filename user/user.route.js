import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// register user
// main thing to consider => save password as hash
router.post("/user/register", async (req, res) => {
  //   extract user data from req.body
  let newUser = req.body;

  // validate user data
  const schema = Joi.object({
    email: Joi.string().email().required().trim().min(5).max(40).lowercase(),
    password: Joi.string().required().trim().min(4).max(20),
    location: Joi.string().required().trim().min(2).max(55),
    gender: Joi.string().required().valid("male", "female", "preferNotToSay"),
  });

  try {
    await schema.validateAsync(newUser);
  } catch (error) {
    // if not valid throw error
    return res.status(400).send({ message: error.message });
  }

  //   check if user with the provided email exists
  const user = await User.findOne({ email: newUser.email });

  // if user with email exist, throw error

  if (user) {
    return res
      .status(409)
      .send({ message: "User with this email already exists." });
  }
  // hash password
  let hashedPassword = await bcrypt.hash(newUser.password, 8);

  newUser.password = hashedPassword;

  // create user with hashed password
  await User.create(newUser);

  return res.status(201).send({ message: "User registered successfully." });
});

// login user
router.get("/user/login", async (req, res) => {
  //   extract login credentials from req.body
  const loginCredentials = req.body;

  //   validate login credentials
  const schema = Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    password: Joi.string().required().trim(),
  });

  try {
    await schema.validateAsync(loginCredentials);
  } catch (error) {
    // if error, throw error
    return res.status(400).send({ message: error.message });
  }
  //   find user by email
  let user = await User.findOne({ email: loginCredentials.email });

  // if not user, throw error
  if (!user) {
    return res.status(404).send({ message: "Invalid credentials." });
  }
  // password match check
  const passwordMatch = await bcrypt.compare(
    loginCredentials.password, //plain_password
    user.password //hashed password
  );

  //   if not password match, throw error
  if (!passwordMatch) {
    return res.status(404).send({ message: "Invalid credentials." });
  }

  //   generate a token
  const token = jwt.sign(
    { email: user.email },
    "kdafdjkasfdkadjfajfjkdfkakdjkafkjdkafdkj32413"
  );

  //   hide password
  user.password = undefined;
  // send appropriate response
  return res.status(200).send({ user, token });
});

export default router;
