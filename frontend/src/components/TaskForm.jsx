import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, XCircle } from 'lucide-react';

const TaskForm = ({ onSubmit, editTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || '');
      setDescription(editTask.description || '');
      setStatus(editTask.status || 'pending');
      setPriority(editTask.priority || 'medium');
      setDueDate(editTask.dueDate ? editTask.dueDate.substring(0, 10) : '');
      setErrors({});
    } else {
      resetForm();
    }
  }, [editTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('pending');
    setPriority('medium');
    setDueDate('');
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!title || title.trim().length < 3) {
      newErrors.title = 'Title is required and must be at least 3 characters.';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must be under 100 characters.';
    }

    if (description && description.trim().length > 500) {
      newErrors.description = 'Description must be under 500 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || null
    };

    onSubmit(taskData);
    if (!editTask) {
      resetForm();
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h2 className="card-title">
          {editTask ? 'Edit Task' : 'Create New Task'}
        </h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Title <span style={{ color: 'var(--danger)' }}>*</span></label>
            <input
              type="text"
              className={`form-input ${errors.title ? 'has-error' : ''}`}
              placeholder="e.g. Design API routes"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors(prev => ({ ...prev, title: '' }));
                }
              }}
            />
            {errors.title && <div className="form-error-msg">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className={`form-input form-textarea ${errors.description ? 'has-error' : ''}`}
              placeholder="Provide a detailed task description..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) {
                  setErrors(prev => ({ ...prev, description: '' }));
                }
              }}
            />
            {errors.description && <div className="form-error-msg">{errors.description}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary btn-block">
              {editTask ? (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              ) : (
                <>
                  <PlusCircle size={16} />
                  Add Task
                </>
              )}
            </button>
            {editTask && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                <XCircle size={16} />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
