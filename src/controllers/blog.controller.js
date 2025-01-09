import Blog from '../models/blog.model.js'
import ApiError from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, tags, category, thumbnail } = req.body

  if (
    [title, content, category, thumbnail].some((field) => field?.trim() === '')
  ) {
    return next(
      new ApiError(400, 'Title, content, thumbnail and category are required')
    )
  }

  const existingBlog = await Blog.findOne({ title })

  if (existingBlog) {
    return next(new ApiError(409, 'Blog with same title already exists'))
  }

  const thumbnailPath = req.file ? req.file.filename : null

  const newBlog = new Blog({
    title,
    content,
    tags,
    category,
    thumbnail: thumbnailPath,
    author: req.user._id
  })

  await newBlog.save()

  return res.status(201).json({
    message: 'Blog created successfully',
    success: true,
    blog: newBlog
  })
})

const getAllBlogs = asyncHandler(async (req, res) => {
  const { title, page = 1, limit = 10 } = req.query
  const filter = title ? { title: { $regex: title, $options: 'i' } } : {}
  const skip = (page - 1) * limit

  const blogs = await Blog.find(filter)
    .populate('author', 'full_name email username')
    .skip(skip)
    .limit(parseInt(limit))

  const totals = await Blog.countDocuments(filter)

  return res.json({
    success: true,
    blogs,
    totals,
    current_page: parseInt(page),
    pages: Math.ceil(totals / limit)
  })
})

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id) {
    return next(new ApiError(400, 'Blog ID is required'))
  }

  const blog = await Blog.findById(id).populate(
    'author',
    'full_name email username'
  )

  if (!blog) {
    return next(new ApiError(404, 'Blog not found'))
  }

  return res.status(200).json({ blog, success: true })
})

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id) {
    return next(new ApiError(400, 'Blog ID is required'))
  }

  const blog = await Blog.findByIdAndDelete(id)

  if (!blog) {
    return next(new ApiError(404, 'Blog not found'))
  }

  return res
    .status(200)
    .json({ message: 'Blog deleted successfully', success: true })
})

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id) {
    return next(new ApiError(400, 'Blog ID is required'))
  }

  const { title, content, tags, category, thumbnail } = req.body

  if (!title?.trim() || !content?.trim() || !category?.trim()) {
    return next(new ApiError(400, 'Title, content and category are required'))
  }

  const updateFields = {
    title,
    content,
    category,
    ...(tags && { tags }),
    ...(thumbnail && { thumbnail })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updateFields, {
    new: true
  }).populate('author', 'full_name email username')

  if (!updatedBlog) {
    return next(new ApiError(404, 'Blog not found'))
  }

  return res.status(200).json({
    message: 'Blog updated successfully',
    success: true
  })
})

export { createBlog, getAllBlogs, getBlog, deleteBlog, updateBlog }
