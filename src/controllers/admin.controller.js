import Blog from '../models/blog.model.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const adminDeleteBlog = asyncHandler(async (req, res) => {
  const { userId, blogId } = req.params;

  if (!userId || !blogId) {
    return next(new ApiError(400, 'User ID and Blog ID are required'));
  }

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return next(new ApiError(404, 'Blog does not exist'));
  }

  const isAdmin = req.user && req.user.role === 'Admin';

  if (!isAdmin) {
    return next(new ApiError(403, 'Only admin can delete blogs'));
  }

  await Blog.findByIdAndDelete(blogId);

  return res
    .status(200)
    .json({ message: 'Blog deleted successfully', success: true });
});

export { adminDeleteBlog };
