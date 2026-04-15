import {Router} from "express"
import { generateSummary } from "../controller/ai.controller.js";

const router = Router();

router.route("/summary")
.post(generateSummary)

export { router as AIRouter};


