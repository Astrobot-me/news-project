import asyncHandler from "express-async-handler";
import { User } from "../model/user.model.js";
import { generateJwt } from "../utlils/utils.js";
import bcrypt from "bcrypt";

// To validate the sign In Request
export const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(401).json({
        message: "Invalid credentials",
        });
        return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        res.status(401).json({
        message: "Invalid credentials",
        });
        return;
    }

    const token = generateJwt(user._id.toString());
    res.status(200).json({
        message: "User is Successfully Logged In",
        email: user.email,
        id: user._id,
        userToken: token,
    });
    return;
});


// To get User Details from Database 
export const getUserDetails = asyncHandler( async (req, res ) => { 

    const userId = req.query.userId as string;

    if (!userId) {
        res.status(400).json({ 
            message: "User ID is required in query parameters" 
        });
        return;
    }

    const user = await User.findById(userId); 
    if (!user) {
        res.status(404).json({ 
            message: "User not found" 
        });
        return;
    }

    res.status(200).json(user);
    return; 

} )


// To register user in Database  
export const registerUser = asyncHandler(async (req, res) => {
    const { email, password, interest_tags } = req.body;

    if (!email || !password || !Array.isArray(interest_tags)) {
        res.status(400).json({ 
            message: "Email, password, and interest_tags are required" 
        });
        return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(409).json({ 
            message: "Email already exists" 
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
        id: newUser._id,
        userToken: token,
    });

    return; 
});