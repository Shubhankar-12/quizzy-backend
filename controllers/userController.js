import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user points and proficiency
// @route   PUT /api/users/updatePoints
// @access  Private
const updatePointsAndProficiency = asyncHandler(async (req, res) => {
    const { additionalCurrentPoints, additionalTotalPoints } = req.body;

    // Find the user by ID
    const user = await User.findById(req.user._id);

    if (user) {
        // Increment the currentPoints and totalPoints with the additional values
        user.currentPoints += Number(additionalCurrentPoints) || 0;
        user.totalPoints += Number(additionalTotalPoints) || 0;
        // Calculate and update proficiency (assuming proficiency is a derived field)
        user.proficiency = user.totalPoints !== 0 ? (user.currentPoints / user.totalPoints) * 100 : 0;
        // Save the updated user
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            currentPoints: updatedUser.currentPoints,
            totalPoints: updatedUser.totalPoints,
            proficiency: updatedUser.proficiency,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Reset user stats (points, proficiency, rank, language)
// @route   PUT /api/users/resetStats
// @access  Private
const resetStats = asyncHandler(async (req, res) => {
    // Find the user by ID
    const user = await User.findById(req.user._id);

    if (user) {
        // Reset user stats
        user.currentPoints = 0;
        user.totalPoints = 0;
        user.proficiency = 0;
        user.rank = 0;
        user.language = {};
        // Save the updated user
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            currentPoints: updatedUser.currentPoints,
            totalPoints: updatedUser.totalPoints,
            proficiency: updatedUser.proficiency,
            rank: updatedUser.rank,
            language: updatedUser.language,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @desc    Get user points, proficiency, rank, and language
// @route   GET /api/users/stats
// @access  Private
const getUserStats = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            currentPoints: user.currentPoints,
            totalPoints: user.totalPoints,
            proficiency: user.proficiency,
            rank: user.rank,
            languages: user.languages,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updatePointsAndProficiency,
    getUserStats,
    resetStats
};