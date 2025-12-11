import asyncHandler from "express-async-handler";
import { User } from "../model/user.model.js";
import { generateJwt } from "../utlils/utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import type { JwtPayload } from "../utlils/schema.js";




// To validate the sign In Request
export const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(401).json({
        error: "Invalid credentials",
        });
        return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        res.status(401).json({
        error: "Invalid credentials",
        });
        return;
    }

    const token = generateJwt(user._id.toString());
    res.status(200).json({
        message: "User is Successfully Logged In",
        email: user.email,
        userId: user._id,
        userToken: token,
    });
    return;
});


// To get User Details from Database 
export const getUserDetails = asyncHandler(async (req, res) => {
    const token = req.query.userToken;

    if (typeof token !== "string" || !token) {
        res.status(400).json({
            message: "User token is required in query parameters"
        });
        return;
    }

    let decoded: JwtPayload;
    const secretKey =  process.env.JWT_SECRET as string; 
    // console.log(secretKey)  

    try {
        decoded = jwt.verify(
            token,
            secretKey
        ) as JwtPayload;

        // console.log("decoded", decoded)

        if (!decoded.userId) {
            throw new Error("Invalid token payload");
        }
    } catch (err) {
        res.status(401).json({
            error: "Invalid or expired token. Please login again."
        });
        return;
    }

    // Fetch user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        res.status(404).json({
            error: "User not found"
        });
        return;
    }

    res.status(200).json(user);

    return;
});

// To register user in Database  
export const registerUser = asyncHandler(async (req, res) => {
    const { email, password, interest_tags } = req.body;

    if (!email || !password || !Array.isArray(interest_tags)) {
        res.status(400).json({ 
            error: "Email, password, and interest_tags are required" 
        });
        return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(409).json({ 
            error: "Email already exists" 
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword,
        interest_tags,
        saved_articles: [],
        read_articles: []
    });

    await newUser.save();

    const token = generateJwt(newUser._id.toString());

    res.status(201).json({
        message: "User is Successfully Registered",
        email: newUser.email,
        userId: newUser._id,
        userToken: token,
    });

    return; 
});