import express from 'express'; 
import { router as ArticleRouter} from './routes/article.route.js';

const app = express() 


app.use(express.json()); 

app.use("/api/articles", ArticleRouter)

export default app;