import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updatePointsAndProficiency,
    getUserStats,
    resetStats,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.put('/updatePoints', protect, updatePointsAndProficiency);
router.put('/resetStats', protect, resetStats);
router.get('/stats', protect, getUserStats);
export default router;