import { useState, useEffect, useCallback, useRef } from 'react';
import { todoService, categoryService } from '../services/api';
import { message } from 'antd';
import { TodoContext } from './TodoContext';

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    categoryId: null,
    completed: undefined,
    priority: undefined
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [stats, setStats] = useState({ totalCompleted: 0 });

  const isInitialMount = useRef(true);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  const { current, pageSize } = pagination;

  const fetchTodos = useCallback(async (page = current, currentFilters = filters) => {
    setLoading(true);
    try {
      const res = await todoService.getAll({
        page,
        limit: pageSize,
        ...currentFilters
      });
      setTodos(res.data.data);
      setStats({ totalCompleted: res.data.meta.totalCompleted });
      setPagination(prev => ({
        ...prev,
        current: res.data.pagination.page,
        total: res.data.pagination.total
      }));
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      message.error('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [current, pageSize, filters]);

  useEffect(() => {
    if (isInitialMount.current) {
      fetchCategories();
      fetchTodos();
      isInitialMount.current = false;
    }
  }, [fetchCategories, fetchTodos]);

  const addTodo = async (data) => {
    try {
      await todoService.create(data);
      message.success('Todo added successfully');
      fetchTodos(1);
    } catch (error) {
      console.error('Failed to add todo:', error);
      message.error('Failed to add todo');
    }
  };

  const updateTodo = async (id, data) => {
    try {
      await todoService.update(id, data);
      message.success('Todo updated successfully');
      fetchTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
      message.error('Failed to update todo');
    }
  };

  const toggleTodoComplete = async (id) => {
    try {
      await todoService.toggleComplete(id);
      fetchTodos();
    } catch (error) {
      console.error('Failed to toggle todo status:', error);
      message.error('Failed to toggle status');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.delete(id);
      message.success('Todo deleted');
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
      message.error('Failed to delete todo');
    }
  };

  const addCategory = async (data) => {
    try {
      await categoryService.create(data);
      message.success('Category added');
      fetchCategories();
    } catch (error) {
      console.error('Failed to add category:', error);
      message.error('Failed to add category');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id);
      message.success('Category deleted');
      fetchCategories();
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete category:', error);
      message.error('Failed to delete category');
    }
  };

  const value = {
    todos,
    categories,
    loading,
    filters,
    pagination,
    stats,
    setFilters,
    setPagination,
    fetchTodos,
    addTodo,
    updateTodo,
    toggleTodoComplete,
    deleteTodo,
    addCategory,
    deleteCategory
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
