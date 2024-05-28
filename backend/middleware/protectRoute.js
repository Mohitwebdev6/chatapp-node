import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute =async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Unauthorized access - No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized access - Invalid Token" });
    }

    
    const user =await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware : ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default protectRoute
