import { Schema } from 'mongoose';

export const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  text: {
    type: String,
    required: [true, 'Comment text is required'],
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date
  }
});
