import React from 'react';
import { Calendar, Edit2, Trash2, Check, AlertCircle } from 'lucide-react';

const TaskItem = ({ task, onEdit, onDelete, onStatusToggle }) => {
  const isCompleted = task.status === 'completed';
  
  const isOverdue = (() => {
    if (!task.dueDate || isCompleted) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  })();

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low': return 'badge-low';
      case 'high': return 'badge-high';
      default: return 'badge-medium';
    }
  };

  return (
    <div className={`task-card ${task.status} animate-fade-in`}>
      <div className="task-card-header">
        <div className="task-card-title-group">
          <label className="task-checkbox-wrapper">
            <input
              type="checkbox"
              className="task-checkbox"
              checked={isCompleted}
              onChange={() => onStatusToggle(task)}
            />
            <span className="task-checkbox-custom">
              <Check />
            </span>
          </label>
          <span className="task-card-title">{task.title}</span>
        </div>
        <span className={`badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <div className="task-card-body">
          {task.description}
        </div>
      )}

      <div className="task-card-footer">
        <div className={`task-date-wrapper ${isOverdue ? 'overdue' : ''}`}>
          {task.dueDate ? (
            <>
              {isOverdue ? <AlertCircle size={14} /> : <Calendar size={14} />}
              <span>
                {isOverdue ? 'Overdue: ' : 'Due: '}
                {formatDate(task.dueDate)}
              </span>
            </>
          ) : (
            <span style={{ color: 'var(--text-light)', fontSize: '12px' }}>No due date</span>
          )}
        </div>

        <div className="task-card-actions">
          <button
            type="button"
            className="action-btn action-btn-edit"
            onClick={() => onEdit(task)}
            title="Edit Task"
          >
            <Edit2 size={16} />
          </button>
          <button
            type="button"
            className="action-btn action-btn-delete"
            onClick={() => onDelete(task._id)}
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
