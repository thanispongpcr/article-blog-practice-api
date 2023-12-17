import jwt from "jsonwebtoken";
import { expressjwt} from "express-jwt";

const login = (req, res) => {
  const { username, password } = req.body;
  if (password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ token, username });
  } else {
    return res.status(400).json({ error: "รหัสผ่านไม่ถูกต้อง" });
  }
};

const requireLogin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

export { login, requireLogin };
