import express from 'express';
import { createQuestion, getAllQuestions, getQuestionsByLanguage } from '../controllers/questionController.js';
const router = express.Router();

router.get('/:language', getQuestionsByLanguage);
router.get('/', getAllQuestions);
router.post('/', createQuestion);
export default router;