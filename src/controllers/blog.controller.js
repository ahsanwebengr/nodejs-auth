import Blog from '../models/blog.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { blogValidation } from '../validations/blog.validator.js';

const createBlog = asyncHandler(async (req, res, next) => {
  const { error, value } = blogValidation.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    return next(
      new ApiError(
        400,
        error.details
          .map((err) => err.message)
          .join(',')
          .replace(/['"]/g, '')
      )
    );
  }

  const { title, content, tags, category } = value;

  if (!req.file) {
    return next(new ApiError(400, 'Thumbnail image is required'));
  }

  const existingBlog = await Blog.findOne({ title });

  if (existingBlog) {
    return next(new ApiError(409, 'Blog with same title already exists'));
  }

  const thumbnailPath = req.file ? req.file.filename : null;

  const newBlog = new Blog({
    title,
    content,
    tags,
    category,
    thumbnail: thumbnailPath,
    author: req.user._id
  });

  await newBlog.save();

  return res
    .status(201)
    .json(new ApiResponse(201, 'Blog created successfully'));
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const { title, page = 1, limit = 10 } = req.query;
  const filter = title ? { title: { $regex: title, $options: 'i' } } : {};
  const skip = (page - 1) * limit;

  const blogs = await Blog.find(filter)
    .populate('author', 'full_name email username')
    .skip(skip)
    .limit(parseInt(limit));

  const totals = await Blog.countDocuments(filter);

  return res.json({
    success: true,
    blogs,
    totals,
    current_page: parseInt(page),
    pages: Math.ceil(totals / limit)
  });
});

const getBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ApiError(400, 'Blog ID is required'));
  }

  const blog = await Blog.findById(id).populate(
    'author',
    'full_name email username'
  );

  if (!blog) {
    return next(new ApiError(404, 'Blog not found'));
  }

  return res.status(200).json(new ApiResponse(200, 'Blog Retrieved', { blog }));
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ApiError(400, 'Blog ID is required'));
  }

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return next(new ApiError(404, 'Blog not found'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Blog deleted successfully'));
});

const updateBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ApiError(400, 'Blog ID is required'));
  }

  const { error, value } = blogValidation.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    return next(
      new ApiError(
        400,
        error.details
          .map((err) => err.message)
          .join(',')
          .replace(/['"]/g, '')
      )
    );
  }

  const { title, content, tags, category, thumbnail } = value;

  const updateFields = {
    title,
    content,
    category,
    ...(tags && { tags }),
    ...(thumbnail && { thumbnail })
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, updateFields, {
    new: true
  }).populate('author', 'full_name email username');

  if (!updatedBlog) {
    return next(new ApiError(404, 'Blog not found'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Blog updated successfully'));
});

export { createBlog, getAllBlogs, getBlog, deleteBlog, updateBlog };
