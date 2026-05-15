const Joi = require('joi');

const todoSchema = Joi.object({
  title: Joi.string().required().min(3).max(100).messages({
    'string.empty': 'Judul tidak boleh kosong',
    'string.min': 'Judul minimal 3 karakter',
    'any.required': 'Judul wajib diisi'
  }),
  description: Joi.string().allow('', null).max(500).empty(''),
  completed: Joi.boolean().default(false),
  priority: Joi.string().valid('low', 'medium', 'high', 'LOW', 'MEDIUM', 'HIGH').uppercase().default('LOW'),
  dueDate: Joi.date().iso().allow(null).empty(''),
  categoryId: Joi.number().integer().allow(null).empty('')
});

module.exports = { todoSchema };
