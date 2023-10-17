import express from 'express'
const router = express.Router();
import { login,signup,loginHistory} from '../controller/auth.js';
import { Updateuser, getAlluser } from '../controller/user.js';
import { otpVerify,mobileGet } from '../controller/verify.js';
import auth from "../middleware/auth.js";
router.post('/signup',signup)



router.post('/login',login)


router.get('/loginHistory',loginHistory) 
    
router.get('/getAlluser',getAlluser)

router.patch('/update/:id',auth,Updateuser)

router.post("/otpsend", mobileGet);
router.post("/verify", otpVerify);

export default router; 