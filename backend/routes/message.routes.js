import express from "express";
import { sendMessage } from "../controllers/message.controller.js";

const router=express.Router()

router.get("/send/:id",sendMessage)


export default router
