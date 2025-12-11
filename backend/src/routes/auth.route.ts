import { Router, type Request, type Response } from 'express';
import { 
    authenticateUser ,
    getUserDetails, 
    registerUser,
} from '../controller/auth.controller.js';
import { protect } from '../middleware/authMiddleware.js';


const router = Router(); 

router.post("/login", authenticateUser); 
router.post("/register", registerUser); 

//Todo: protect this route
router.get("/getuser",protect, getUserDetails)




export { router }