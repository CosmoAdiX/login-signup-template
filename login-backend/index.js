const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const port = 5000;
const cors = require("cors");
const usermodel=require('./model/user');
const mongoose=require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your frontend URL
      credentials: true, // Allow cookies to be sent
    })
  );

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("the server is running");
});
app.post("/signup",async (req, res) => {
    const { username, email, password } = req.body;
  try {
    if (!email || !password || !username) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await usermodel.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new usermodel({
      email,
      password: hashedPassword,
      username,
    });
    await user.save();


    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  
});
app.post("/login", async (req, res) => {
    let { email, password } = req.body;
  
    try {
      let user = await usermodel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      let hash = user.password;
      const result = await bcrypt.compare(password, hash);
  
      if (result) {
        let token = jwt.sign({ email: user.email }, "shhhhh");
  
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to false for HTTP (localhost)
            sameSite: "lax", // Use "lax" for local development
            maxAge: 1000 * 60 * 60 * 24, // 1 day
          });
  
        return res.json({ message: "Logged in", status: 200 });
      } else {
        return res.status(400).json({ message: "Wrong password" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/profile", async (req, res) => {
    try {
      // Get the token from cookies
      let token = req.cookies.token;
  
      // Check if the token exists
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: JWT must be provided." });
      }
  
      // Verify the token
      let decoded;
      try {
        decoded = jwt.verify(token, "shhhhh");
      } catch (err) {
        return res.status(401).json({ message: "Invalid token." });
      }
  
      // Find the user by email
      let user = await usermodel.findOne({ email: decoded.email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Generate a random flag
      const flag = crypto.randomBytes(16).toString("hex");
  
      // Send the flag as a response
      return res.json({ flag });
    } catch (error) {
      console.error("Error in /profile route:", error);
  
      // Handle specific errors
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token." });
      } else {
        return res.status(500).json({ message: "Internal server error." });
      }
    }
  });

app.get("/flag",async(req,res)=>{

})
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("logged out");
});

app.listen(port, () => {
  console.log("server running at port : 5000");
});
