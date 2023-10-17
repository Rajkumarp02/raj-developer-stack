import express from "express";
import {deleteAnswer, postAnswer} from "../controller/answer.js";
import auth from "../middleware/auth.js";
const router = express.Router();


router.patch("/post/:id",postAnswer);
router.patch("/delete/:id",auth,deleteAnswer);


export default router;