import { Router } from 'express';
import { isAuthenticate } from '../middlewares/auth.middleware.js';
import {
  addComment,
  deleteComment,
  editComment
} from '../controllers/comment.controller.js';

const router = new Router();

router.post('/:blogId', isAuthenticate, addComment);
router.delete('/:blogId/:commentId', isAuthenticate, deleteComment);
router.put('/:blogId/:commentId', isAuthenticate, editComment);

export default router;
