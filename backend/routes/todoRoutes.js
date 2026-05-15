const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const validate = require('../middleware/validator');
const { todoSchema } = require('../validations/todoValidation');

router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', validate(todoSchema), todoController.createTodo);
router.put('/:id', validate(todoSchema), todoController.updateTodo);
router.patch('/:id/toggle', todoController.toggleComplete);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
