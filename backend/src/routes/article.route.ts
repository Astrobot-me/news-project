import { Router, type Request, type Response } from 'express';
import { getArticlesByQuery, getTopHeadlines, getArticleById } from '../controller/article.controller.js';

const router = Router();

router.get('/top-headlines', getTopHeadlines);
router.get('/search', getArticlesByQuery);
router.get('/content', getArticleById);

export { router }; 