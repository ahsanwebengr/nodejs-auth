import Joi from 'joi';

const registerValidation = Joi.object({
  full_name: Joi.string().trim().min(3).max(50).required().messages({
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters long',
    'string.max': 'Full name must not exceed 50 characters'
  }),

  username: Joi.string()
    .trim()
    .pattern(/^[a-z0-9]+$/)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.empty': 'Username is required',
      'string.pattern.base':
        'Username must only contain lowercase letters and numbers, without spaces or special characters',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must not exceed 20 characters'
    }),

  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address'
  }),

  password: Joi.string()
    .trim()
    .min(8)
    .max(128)
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])')
    )
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 128 characters',
      'string.pattern.base':
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),
  profile_pic: Joi.string().optional()
});

export { registerValidation };
