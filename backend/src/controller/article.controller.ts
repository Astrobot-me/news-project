import express, { type Request, type Response } from 'express';
import axios from 'axios';

const GUARDIAN_API_KEY = process.env.GAURDIAN_API_KEY;
const GUARDIAN_BASE_URL = 'https://content.guardianapis.com';

export const getTopHeadlines = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${GUARDIAN_BASE_URL}/search`, {
            params: {
                'api-key': GUARDIAN_API_KEY, 
                'order-by': 'newest',
                'show-fields': 'all',
                'page-size': 10,
            },
        });
        res.json(response.data.response.results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch top headlines' });
    }
};

export const getArticlesByQuery = async (req: Request, res: Response) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'Query string "q" is required' });
    }
    try {
        const response = await axios.get(`${GUARDIAN_BASE_URL}/search`, {
            params: {
                'api-key': GUARDIAN_API_KEY,
                'q': q,
                'show-fields': 'all',
                'page-size': 10,
            },
        });
        res.json(response.data.response.results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch articles by query' });
    }
};

export const getArticleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Article ID is required' });
    }
    try {
        const response = await axios.get(`${GUARDIAN_BASE_URL}/${id}`, {
            params: {
                'api-key': GUARDIAN_API_KEY,
                'show-fields': 'all',
            },
        });
        res.json(response.data.response.content);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch article by ID' });
    }
};