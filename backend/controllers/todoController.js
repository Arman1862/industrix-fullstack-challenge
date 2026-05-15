const { Todo, Category } = require('../models');
const { Op } = require('sequelize');

exports.getAllTodos = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', categoryId, completed, priority } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where.title = { [Op.iLike]: `%${search}%` };
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (completed !== undefined) {
      where.completed = completed === 'true';
    }
    if (priority) {
      where.priority = priority;
    }

    const { count, rows } = await Todo.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [{ model: Category, as: 'category' }]
    });

    const totalCompleted = await Todo.count({ where: { ...where, completed: true } });

    res.json({
      data: rows,
      meta: {
        totalCompleted
      },
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category' }]
    });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate, categoryId } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    
    const todo = await Todo.create({ 
      title, 
      description, 
      priority, 
      dueDate, 
      categoryId 
    });
    
    const newTodo = await Todo.findByPk(todo.id, {
      include: [{ model: Category, as: 'category' }]
    });
    
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate, categoryId } = req.body;
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    
    await todo.update({ 
      title, 
      description, 
      completed, 
      priority, 
      dueDate, 
      categoryId 
    });
    
    const updatedTodo = await Todo.findByPk(todo.id, {
      include: [{ model: Category, as: 'category' }]
    });
    
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.toggleComplete = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    
    await todo.update({ completed: !todo.completed });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    
    await todo.destroy();
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
