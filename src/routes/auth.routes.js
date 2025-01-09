import { Router } from 'express'
import {
  userLogin,
  userLogout,
  userRegister,
  forgotPassword,
  verifyOtp,
  resetPassword
} from '../controllers/auth.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = new Router()

router.post('/register', upload('profile_pic', 'profile'), userRegister)
router.post('/login', userLogin)
router.get('/logout', userLogout)
router.get('/logout', userLogout)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOtp)
router.post('/reset-password', resetPassword)

export default router
