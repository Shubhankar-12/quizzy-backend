import asyncHandler from 'express-async-handler';
import Question from '../models/questionsModel.js';

// @desc    Get quiz questions for a specific language
// @route   GET /api/questions/
// @access  Public
const getAllQuestions = asyncHandler(async (req, res) => {
    try {
        const questions = await Question.find({});
        res.status(200).json({ questions });
    } catch (err) {
        res.status(404).json({ error: "Not found!" });
    }
})
// @desc    Get quiz questions for a specific language
// @route   GET /api/questions/:language
// @access  Public
const getQuestionsByLanguage = asyncHandler(async (req, res) => {
    const languageName = req.params.language.toLowerCase();

    try {
        // Fetch language based on the selected language name
        const language = await Question.findOne({ name: languageName });
        if (!language) {
            return res.status(404).json({ error: 'Language not found' });
        }
        // Extract and send only the questions array
        const questions = language.questions;
        res.json({ questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private (Only accessible by admins or authorized users)
const createQuestion = asyncHandler(async (req, res) => {
    const { language, question, options, correctAnswer, difficulty } = req.body;
    try {
        // Create a new question
        const newQuestion = await Question.create({
            language,
            question,
            options,
            correctAnswer,
            difficulty,
        });

        res.status(201).json({ question: newQuestion });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Invalid question data' });
    }
});


export { createQuestion, getQuestionsByLanguage, getAllQuestions };
