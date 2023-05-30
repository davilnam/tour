import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, email, password, photo } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing input",
      });
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists. Try again",
      });
    } else {
      const hashPwd = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashPwd,
        photo,
      });
      await newUser.save();
      return res.status(200).json({
        success: true,
        message: "register successfull",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to register. Try again",
    });
  }
};

export const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Missing input",
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const { password, role, ...rest } = user.toObject();

    // create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // set token in the browser cookies and send the response to the client
    res.cookie('accessToken', token, {
        httpOnly: true,
        expires: token.expiresIn
    }).status(200).json({
        success: true,
        message: 'login successfully',
        token,
        role,
        data: {...rest}
    })
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Failed to login. Try again",
      });
  }
};
