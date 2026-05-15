const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    console.log('Validation Error:', errorMessage);
    console.log('Request Body:', req.body);
    return res.status(400).json({ error: errorMessage });
  }
  // Replace req.body with validated and transformed values
  req.body = value;
  next();
};

module.exports = validate;
