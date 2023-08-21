import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";

// json web token is encryption/decryption algorithm

export const isUser = async (req, res, next) => {
  // extract token from headers
  const authorization = req.headers.authorization;

  // if token not there, throw error
  const splittedToken = authorization?.split(" ");

  // short circuit
  const token = splittedToken?.length === 2 && splittedToken[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized user." });
  }

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

  //added user to req
  req.userData = user;

  next();
};
