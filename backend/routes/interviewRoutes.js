import express from "express";
import { getQuestion, evaluateAnswer } from "../controllers/interviewController.js";

const router = express.Router();

router.get("/question", getQuestion);
router.post("/evaluate", evaluateAnswer);

export default router;