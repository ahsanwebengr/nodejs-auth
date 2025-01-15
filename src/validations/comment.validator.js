import Joi from 'joi';

const commentValidation = Joi.object({
  text: Joi.string().required().max(500).messages({
    'any.required': 'Comment text is required',
    'string.empty': 'Comment text cannot be empty',
    'string.max': 'Comment cannot exceed 500 characters'
  })
});

export { commentValidation };
