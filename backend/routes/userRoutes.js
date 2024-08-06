import express from 'express'
import { authUser,
     registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile 
} from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile); //because we both jave put and get request


export default router;