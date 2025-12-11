import express, { type Request, type Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from "dotenv";
import type { ErrorResponse } from '../utlils/schema.js';



dotenv.config({ 
    path: "./.env" 
});


const GUARDIAN_BASE_URL = 'https://content.guardianapis.com';
const GUARDIAN_API_KEY = process.env.GAURDIAN_API_KEY as string;

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
        res.status(200).json(response.data.response.results);
    } catch (error) {
        
        const err = error as AxiosError<ErrorResponse>; 
        res.status(500).json({ 
            error: 'Failed to fetch top headlines' ,
            message: err?.response?.data?.message, 
        });
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

        const err = error as AxiosError<ErrorResponse>; 
        res.status(500).json({ 
            error: 'Failed to fetch articles by query' ,
            message : err?.response?.data?.message
        });
    }
};

export const getArticleById = async (req: Request, res: Response) => {
    let { id } = req.query;
    // Decode URI component and replace %2F with /
    id = decodeURIComponent(id as string).replace(/%2F/g, '/');

    console.log("Id", id)
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

        const err = error as AxiosError<ErrorResponse>; 
        res.status(500).json({ 
            error: 'Failed to fetch article by ID' , 
            message : err?.response?.data?.message, 
        });
    }
};


export const getArticlesByTags = async (req: Request, res: Response) => {
    const { tags } = req.body;
    if (!Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ error: 'Tags array is required in request body' });
    }
    try {
        const tagQuery = tags.map(tag => `"${tag}"`).join(' OR ');
        const response = await axios.get(`${GUARDIAN_BASE_URL}/search`, {
            params: {
                'api-key': GUARDIAN_API_KEY,
                'q': tagQuery,
                'show-fields': 'all',
                'page-size': 10,
            },
        });
        res.json(response.data.response.results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch articles by tags' });
    }
};