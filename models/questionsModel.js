import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
    },
});

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionSchema],
        required: true,
    },
});

const Question = mongoose.model('Questionsdb', languageSchema);

export default Question;
