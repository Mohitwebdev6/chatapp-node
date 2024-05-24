import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password donot match" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "username already taken" });
    }

    let boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    let girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      await newUser.save();

      return res.status(201).json({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        gender: user.gender,
        profilePic: user.profilePic,
      });
    }
    else{
        return res.status(401).json({message:"Invalid credentials"})
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ message: "Internal server errror" });
  }
};

export const login = (req, res) => {
  res.send("Login");
};

export const logout = (req, res) => {
  res.send("Logout");
};
