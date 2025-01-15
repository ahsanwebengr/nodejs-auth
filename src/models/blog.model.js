import { Schema, model } from 'mongoose';
import { commentSchema } from './comment.model.js';

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      trim: true,
      minlength: [5, 'Title must be at least 5 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Technology',
        'Health',
        'Finance',
        'Education',
        'Lifestyle',
        'Others'
      ]
    },
    tags: {
      type: [String]
    },
    thumbnail: {
      type: String
    },
    comments: [commentSchema]
  },
  { timestamps: true }
);

const Blog = model('Blog', blogSchema);

export default Blog;
