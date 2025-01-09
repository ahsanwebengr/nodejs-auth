import jwt from 'jsonwebtoken'

const isAuthenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized, Please login first', success: false })
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = decoded

    next()
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Invalid or expired token', success: false })
  }
}

export { isAuthenticate }
