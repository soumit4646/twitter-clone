import { loginSchema, signupSchema } from "../validation/validation.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;
    signupSchema.parse({ username, fullname, email, password });
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      fullname,
      email,
      password: hashedPassword,
    });

    if (user) {
      generateTokenAndSetCookie(user._id, res);
      await user.save();
      return res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "Invalid data" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    loginSchema.parse({ username, password });
    const user = await User.findOne({ username });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        generateTokenAndSetCookie(user._id, res);
        return res.json({
          _id: user._id,
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          followers: user.followers,
          following: user.following,
          profilePicture: user.profilePicture,
          coverPicture: user.coverPicture,
        });
      } else {
        return res.status(400).json({ error: "Invalid password" });
      }
    } else {
      return res.status(400).json({ error: "Invalid username" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "Invalid data" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: -1 });
    return res.json({ message: "logout successful" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Invalid data" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.json({ error: "Error fetching user" });
  }
};
