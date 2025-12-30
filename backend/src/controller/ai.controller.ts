import axios from "axios";
import chain from "../services/gemini.js";
import type { Request, Response} from 'express'
import { error } from "console";


export async function generateSummary (req: Request, res: Response) { 

    try {

        const { content } = req.body; 

        if(!content) { 
            res.status(400).json({ error : "Missing Paramters: content is required"})
        }


        const output = await chain.invoke({ 
            content
        })

        res.status(200)
        .json({
            ...output
        })
        return; 
        
    } catch (error) {
        res.status(500)
        .json({
            error: "Some Internal Server Error Occured"
        })
        return;
    }
}