import { Router } from 'express';
import { adminDeleteBlog } from '../controllers/admin.controller.js';
import { isAuthenticate } from '../middlewares/auth.middleware.js';

const router = new Router();

router.delete('/delete-blog/:blogId/:userId', isAuthenticate, adminDeleteBlog);

export default router;
