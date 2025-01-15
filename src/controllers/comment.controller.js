import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { commentValidation } from '../validations/comment.validator.js';
import Blog from '../models/blog.model.js';

const addComment = asyncHandler(async (req, res, next) => {
  const { error, value } = commentValidation.validate(req.body);
  const { blogId } = req.params;
  const { _id: userId } = req.user;

  if (error) {
    return next(
      new ApiError(400, error.details[0].message.replace(/['"]/g, ''))
    );
  }

  if (!blogId) {
    return next(new ApiError(400, 'Blog ID is required'));
  }

  const { text } = value;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return next(new ApiError(404, 'Blog not found'));
  }

  await blog.comments.push({
    user: userId,
    text,
    created_at: new Date()
  });

  await blog.save();

  return res
    .status(201)
    .json(new ApiResponse(201, 'Comment added successfully'));
});

const deleteComment = asyncHandler(async (req, res, next) => {
  const blogId = req.params.blogId;
  const { commentId } = req.params;
  const { _id: userId } = req.user;

  if (!commentId || !blogId) {
    return next(new ApiError(400, 'Comment ID and Blog ID are required'));
  }

  const blog = await Blog.findById(blogId).populate('comments');

  if (!blog) {
    return next(new ApiError(404, 'Blog not found'));
  }

  const comment = blog.comments.find((c) => c._id.toString() === commentId);

  if (!comment) {
    return next(new ApiError(404, 'Comment not found'));
  }

  if (comment.user._id.toString() !== userId.toString()) {
    return next(
      new ApiError(403, 'You are not authorized to delete this comment')
    );
  }

  blog.comments = blog.comments.filter((c) => c._id.toString() !== commentId);

  await blog.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Comment deleted successfully'));
});

export { addComment, deleteComment };
