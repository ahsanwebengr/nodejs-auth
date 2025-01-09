import { Router } from 'express'
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog
} from '../controllers/blog.controller.js'
import { isAuthenticate } from '../middlewares/auth.middleware.js'

const router = new Router()

router.post('/', isAuthenticate, createBlog)
router.get('/', getAllBlogs)
router.get('/:id', getBlog)
router.delete('/:id', isAuthenticate, deleteBlog)
router.put('/:id', isAuthenticate, updateBlog)

export default router
