import express from 'express'; 
import { router as ArticleRouter} from './routes/article.route.js';
import { router as UserRouter } from './routes/user.route.js';
import morgan from 'morgan'

const app = express() 


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"))

app.use("/api/auth", UserRouter)
app.use("/api/articles", ArticleRouter)



export default app;