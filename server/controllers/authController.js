import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/authModel.js';

export async function registerUser(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill all the fields" });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "Lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function LoginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "Lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
    console.log(e);
  }
}

export async function logoutUser(req, res) {
  try {
    res.clearCookie("token").status(200).json({ message: "Logout successful" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error during logout" });
  }
}