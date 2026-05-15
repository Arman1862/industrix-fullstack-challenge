const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required().min(2).max(50).messages({
    'string.empty': 'Nama kategori tidak boleh kosong',
    'string.min': 'Nama kategori minimal 2 karakter',
    'any.required': 'Nama kategori wajib diisi'
  }),
  color: Joi.string().regex(/^#[0-9A-F]{6}$/i).default('#1677ff').messages({
    'string.pattern.base': 'Format warna harus hex (contoh: #1677ff)'
  })
});

module.exports = { categorySchema };
