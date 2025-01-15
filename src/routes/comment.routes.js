import { Router } from 'express';
import { isAuthenticate } from '../middlewares/auth.middleware.js';
import {
  addComment,
  deleteComment
} from '../controllers/comment.controller.js';

const router = new Router();

router.post('/:blogId', isAuthenticate, addComment);
router.delete('/:blogId/:commentId', isAuthenticate, deleteComment);

export default router;
