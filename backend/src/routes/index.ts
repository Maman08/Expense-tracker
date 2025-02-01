import express from 'express';
import signup  from '../controllers/auth/signup';
import signin from '../controllers/auth/signin'
import { logout } from '../controllers/auth/logout';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout',logout)

export default router;
