import { Router, type Request, type Response } from 'express';

import { protect } from '../middleware/authMiddleware.js';
import { getReadArticles, getSavedArticles, saveArticle, saveReadArticle } from '../controller/user.controller.js';


const router = Router(); 

router
.route("/save-article",)
.post(saveArticle)
.get(getSavedArticles)


router
.route("/read-article",)
.post(saveReadArticle)
.get(getReadArticles)


export { router }