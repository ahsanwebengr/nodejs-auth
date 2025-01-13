import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler';
import { commentValidation } from '../validations/comment.validator.js';
import Comment from '../models/comment.model.js';
import Blog from '../models/blog.model.js';

const addComment = asyncHandler(async (req, res, next) => {
  const { error, value } = commentValidation.validate(req.body);
  const { blogId, userId } = req.params;

  if (error) {
    return next(
      new ApiError(400, error.details[0].message.replace(/['"]/g, ''))
    );
  }

  const { text } = value;
  const comment = await Comment.create({ user: userId, text });

  await Blog.findByIdAndUpdate(
    blogId,
    { $push: { comments: comment._id } },
    { new: true }
  );
  return res
    .status(201)
    .json(new ApiResponse(201, 'Comment added successfully'));
});

export { addComment };
