import express from 'express'; 
import { router as ArticleRouter} from './routes/article.route.js';
import { router as AuthRouter } from './routes/auth.route.js';
import { router as UserRouter } from './routes/user.route.js';
import morgan from 'morgan'
import { protect } from './middleware/authMiddleware.js';
import cors from 'cors'

const app = express() 




app.use(cors({ 
    origin: ["http://localhost:5173", "https://news-project-one-steel.vercel.app"]
}))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"))

app.use("/api/auth", AuthRouter)
app.use("/api/articles",protect, ArticleRouter)
app.use("/api/user",protect , UserRouter)


app.get("/", (req, res) => {
    const uptimeSec = process.uptime();
    const hours = Math.floor(uptimeSec / 3600);
    const minutes = Math.floor((uptimeSec % 3600) / 60);
    const seconds = Math.floor(uptimeSec % 60);

    const memoryUsage = process.memoryUsage();
    const formatMB = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    res.status(200).json({
        status: "ok",
        message:"Welcome to News Project Backend!", 
        uptime: `${hours}h ${minutes}m ${seconds}s`,
        memoryUsage: {
            rss: formatMB(memoryUsage.rss),
            heapTotal: formatMB(memoryUsage.heapTotal),
            heapUsed: formatMB(memoryUsage.heapUsed),
            external: formatMB(memoryUsage.external),
            arrayBuffers: formatMB(memoryUsage.arrayBuffers)
        },
        timestamp: new Date().toLocaleString()
    });
});


app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
}); 




export default app;
