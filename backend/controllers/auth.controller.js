import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

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
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ message: "Internal server errror" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username,password)
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      res.status(400).json({message:"Invalid username or password"});
    }

    generateTokenAndSetCookie(user._id,res)

    res.status(200).json({
      fullName:user.fullName,
      username:user.username,
      gender:user.gender,
      profilePic:user.profilePic
    })
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal server errror" });
  }
};

export const logout =async (req, res) => {
  try{
    res.cookie("jwt","",{maxAge:0})

    res.status(200).json({
      message:"logout successfully"
    })
  }catch{
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ message: "Internal server errror" });
  }
};
