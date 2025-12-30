import asyncHandler from "express-async-handler";
import { User, type SavedArticleType } from "../model/user.model.js";

// To save an Article
export const saveArticle = asyncHandler(async (req, res) => {
	const { articleId, thumbnail_url, title, description } = req.body;

	const userId = req.user._id;

	if (!userId || !articleId) {
		res.status(400).json({ error: "userId and articleId are required" });
		return;
	}

	const user = await User.findById(userId);
	if (!user) {
		res.status(404).json({ error: "User not found" });
		return;
	}

	try {
		await User.updateOne(
			{ _id: userId },
			{
				$addToSet: {
					saved_articles: {
						article_id: articleId,
						thumbnail_url,
						title,
						description,
					},
				},
			}
		);
	} catch (error) {
		res.status(500).json({ error: "Failed to save article" });
		return;
	}

	res.status(200).json({
		message: "Article saved successfully",
		// saved_articles: user.saved_articles,
	});
});

// Getting all saved articles
export const getSavedArticles = asyncHandler(async (req, res) => {
	const userId = req.user._id;

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

export const removeSavedArticle = asyncHandler(async (req, res) => {
	try {
		const userId = req.user._id;

		const articleId = decodeURIComponent(req.params.articleId as string);

		console.log("Artilce ID: ", articleId, userId);

		if (!userId || !articleId) {
			res.status(400).json({
				error: "User Not Authenticated or Missing Parameters",
			});
		}

		const user = await User.findById(userId);

		if (!user) {
			res.status(400).json({
				error: "User not found",
			});
		}

		const result = await User.updateOne(
			{
				_id: userId,
			},
			{
				$pull: {
					saved_articles: {
						article_id: articleId,
					},
				},
			}
		);

		if (result && result?.matchedCount > 0 && result?.modifiedCount > 0) {
			res.status(200).json({
				message: "Article removed successfully",
			});
			return;
		}

		res.status(203).json({
			message: "Article already removed",
		});
		
		return;
	} catch (error) {
		res.status(500).json({
			message: "Some Internal Server Error Occured",
		});
		return;
	}
});

// To save an Read Article or Mark as Read
export const saveReadArticle = asyncHandler(async (req, res) => {
	const { articleId, thumbnail_url, title, description } = req.body;

	const userId = req.user._id;

	if (!userId || !articleId) {
		res.status(400).json({ error: "userId and articleId are required" });
		return;
	}

	const user = await User.findById(userId);
	if (!user) {
		res.status(404).json({ error: "User not found" });
		return;
	}

	try {
		await User.updateOne(
			{ _id: userId },
			{
				$addToSet: {
					read_articles: {
						article_id: articleId,
						thumbnail_url,
						title,
						description,
					},
				},
			}
		);
	} catch (error) {
		res.status(500).json({ error: "Failed to save article" });
		return;
	}

	res.status(200).json({
		message: "Article Marked successfully",
	});
});

//Getting all Read articles
export const getReadArticles = asyncHandler(async (req, res) => {
	const userId = req.user._id;

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

export const removeReadArticle = asyncHandler(async (req, res) => {
	try {
		const userId = req.user._id;

		const articleId = decodeURIComponent(req.params.articleId as string);

		if (!userId || !articleId) {
			res.status(400).json({
				error: "User Not Authenticated or Missing Parameters",
			});
		}

		const user = await User.findById(userId);

		if (!user) {
			res.status(400).json({
				error: "User not found",
			});
		}

		const result = await User.updateOne(
			{
				_id: userId,
			},
			{
				$pull: {
					read_articles: {
						article_id: articleId,
					},
				},
			}
		);

		console.log(result)

		if (result && result?.matchedCount > 0 && result?.modifiedCount > 0) {
			res.status(200).json({
				message: "Article unmarked successfully",
			});
			return;
		}

		res.status(203).json({
			message: "Article not present",
		});

		return;
	} catch (error) {
		res.status(500).json({
			message: "Some Internal Server Error Occured",
		});
	}
});
