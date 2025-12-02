import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export function encryptPassword(password) {
  const secretKey = process.env.SECRET;
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

export function decryptPassword(encryptedPassword) {
  const secretKey = process.env.SECRET;
  const password = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return password.toString(CryptoJS.enc.Utf8);
}

export function comparePassword(password, encryptedPassword) {
  const decryptedPassword = decryptPassword(encryptedPassword);
  if (password === decryptedPassword) return true;
  return false;
}

export function sendToken(id, email, role) {
  const secretKey = process.env.SECRET;
  const token = jwt.sign({ id, email, role }, secretKey, {
    expiresIn: 24 * 60 * 60,
  });

  return token;
}

export function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    res.send({ success: false, message: "Token not found" });
  } else {
    const result = jwt.verify(token, process.env.SECRET);
    req.id = result.id;
    req.role = result.role;
    req.email = result.email;

    next();
  }
}

export function verifyRole(role) {
  return (req, res, next) => {
    if (!req.role) {
      res.send({ success: false, message: "User NOT Found" });
      return;
    }

    if (req.role === role) {
      next();
    } else {
      res.send({ success: false, message: "UnAuthorized User!!!" });
    }
  };
}
