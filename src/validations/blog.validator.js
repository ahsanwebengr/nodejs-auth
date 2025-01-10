import Joi from 'joi';

const blogValidation = Joi.object({
  title: Joi.string().trim().min(3).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters long'
  }),
  content: Joi.string().trim().min(10).required().messages({
    'string.empty': 'Content is required',
    'string.min': 'Content must be at least 10 characters long'
  }),
  tags: Joi.array().items(Joi.string().trim()).optional(),
  category: Joi.string().trim().required().messages({
    'string.empty': 'Category is required'
  })
});

export { blogValidation };
