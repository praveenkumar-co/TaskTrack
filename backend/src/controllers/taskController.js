import { asyncHandler, ApiError, ApiResponse } from 'node-utils-kit';
import Task from '../models/Task.js';

export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, search, sortBy = 'createdAt', order = 'desc' } = req.query;
  
  const query = {};
  
  if (status) {
    query.status = status;
  }
  
  if (priority) {
    query.priority = priority;
  }
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const sortOrder = order === 'asc' ? 1 : -1;
  const tasks = await Task.find(query).sort({ [sortBy]: sortOrder });

  res.status(200).json(
    new ApiResponse(200, tasks, 'Tasks retrieved successfully')
  );
});

export const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  res.status(200).json(
    new ApiResponse(200, task, 'Task retrieved successfully')
  );
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title || title.trim().length < 3) {
    throw new ApiError(400, 'Title is required and must be at least 3 characters');
  }

  const task = await Task.create({
    title: title.trim(),
    description: description?.trim(),
    status,
    priority,
    dueDate: dueDate || null
  });

  res.status(201).json(
    new ApiResponse(201, task, 'Task created successfully')
  );
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  if (title !== undefined && title.trim().length < 3) {
    throw new ApiError(400, 'Title must be at least 3 characters');
  }

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description.trim();
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate || null;

  await task.save();

  res.status(200).json(
    new ApiResponse(200, task, 'Task updated successfully')
  );
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  res.status(200).json(
    new ApiResponse(200, null, 'Task deleted successfully')
  );
});
