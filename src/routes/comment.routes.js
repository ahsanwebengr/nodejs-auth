import { Router } from 'express';
import { isAuthenticate } from '../middlewares/auth.middleware.js';
import { addComment } from '../controllers/comment.controller.js';

const router = new Router();

router.post('/:blogId/:userId', isAuthenticate, addComment);

export default router;
