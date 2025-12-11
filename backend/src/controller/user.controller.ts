import asyncHandler from "express-async-handler";
import { User, type SavedArticleType } from "../model/user.model.js";

// To save an Article 
export const saveArticle = asyncHandler(async (req, res) => {
    const { userId, articleId } = req.body;

    if (!userId || !articleId) {
        res.status(400).json({ error: "userId and articleId are required" });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    // Check if article already saved
    const alreadySaved = user.saved_articles.some(
        (a: any) => a.articleId === articleId
    );
    if (alreadySaved) {
        res.status(409).json({ error: "Article already saved" });
        return;
    }

    user.saved_articles.push({ 
        article_id: articleId, 
        timestamp: new Date()
    
    } as SavedArticleType);

    await user.save();

    res.status(200).json({
        message: "Article saved successfully",
        saved_articles: user.saved_articles,
    });
});


// Getting all saved articles 
export const getSavedArticles = asyncHandler(async (req, res) => {
    const { userId } = req.user._id;

    if (!userId) {
        res.status(400).json({ error: "userId is required" });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    res.status(200).json({
        saved_articles: user.saved_articles,
    });
});

// To save an Read Article or Mark as Read 
export const saveReadArticle = asyncHandler(async (req, res) => {
    const { userId, articleId } = req.body;

    if (!userId || !articleId) {
        res.status(400).json({ error: "userId and articleId are required" });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    // Check if article already saved
    const alreadyRead = user.read_articles.some(
        (a: any) => a.articleId === articleId
    );
    if (alreadyRead) {
        res.status(409).json({ error: "Article already saved" });
        return;
    }

    user.read_articles.push({ 
        article_id: articleId, 
        timestamp: new Date()
    
    } as SavedArticleType);

    await user.save();

    res.status(200).json({
        message: "Article saved successfully",
        saved_articles: user.read_articles,
    });
});


//Getting all Read articles 
export const getReadArticles = asyncHandler(async (req, res) => {
    const { userId } = req.user._id;

    if (!userId) {
        res.status(400).json({ error: "userId is required" });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    res.status(200).json({
        saved_articles: user.read_articles,
    });
});

