import { Router, type Request, type Response } from 'express';

import { protect } from '../middleware/authMiddleware.js';
import { 
    getReadArticles, 
    getSavedArticles, 
    removeReadArticle, 
    removeSavedArticle, 
    saveArticle, 
    saveReadArticle 
} 
from '../controller/user.controller.js';



const router = Router(); 

router
.route("/save-article")
.post(saveArticle)
.get(getSavedArticles)

router.route("/save-article/:articleId")
.delete(removeSavedArticle)

router
.route("/mark-article")
.post(saveReadArticle)
.get(getReadArticles)

router
.route("/mark-article/:articleId")
.delete(removeReadArticle)


export { router }