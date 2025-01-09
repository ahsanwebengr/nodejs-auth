import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    profile_pic: {
      type: String
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User'
    },
    access_token: [],
    otp_code: {
      type: Number,
      max: 6,
      min: 6
    },
    otp_expiry: {
      type: Date
    },
    is_otp_verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.pre('save', function (next) {
  if (this.isModified('otp_code')) {
    this.otp_expiry = Date.now() + 60000
  }
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      full_name: this.full_name,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

const User = model('User', userSchema)

export default User
