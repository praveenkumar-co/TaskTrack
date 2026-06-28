import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskItem from './components/TaskItem';
import Notification from './components/Notification';
import { api } from './api';
import { ClipboardList } from 'lucide-react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [allTasksForStats, setAllTasksForStats] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sortBy: 'createdAt',
    order: 'desc'
  });
  const [editTask, setEditTask] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const fetchTasks = useCallback(async () => {
    setIsSyncing(true);
    try {
      const response = await api.getTasks(filters);
      setTasks(response.data || []);
      
      const allResponse = await api.getTasks({});
      setAllTasksForStats(allResponse.data || []);
    } catch (error) {
      addToast(error.message || 'Failed to fetch tasks', 'error');
    } finally {
      setIsSyncing(false);
    }
  }, [filters, addToast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCreateOrUpdateTask = async (taskData) => {
    setIsSyncing(true);
    try {
      if (editTask) {
        await api.updateTask(editTask._id, taskData);
        addToast('Task updated successfully', 'success');
        setEditTask(null);
      } else {
        await api.createTask(taskData);
        addToast('Task created successfully', 'success');
      }
      fetchTasks();
    } catch (error) {
      addToast(error.message || 'Failed to save task', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    setIsSyncing(true);
    try {
      await api.deleteTask(id);
      addToast('Task deleted successfully', 'success');
      if (editTask && editTask._id === id) {
        setEditTask(null);
      }
      fetchTasks();
    } catch (error) {
      addToast(error.message || 'Failed to delete task', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleStatusToggle = async (task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    setIsSyncing(true);
    try {
      await api.updateTask(task._id, { status: nextStatus });
      addToast(`Task marked as ${nextStatus}`, 'success');
      if (editTask && editTask._id === task._id) {
        setEditTask((prev) => ({ ...prev, status: nextStatus }));
      }
      fetchTasks();
    } catch (error) {
      addToast(error.message || 'Failed to update task status', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const stats = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return allTasksForStats.reduce(
      (acc, t) => {
        acc.total += 1;
        if (t.status === 'completed') {
          acc.completed += 1;
        } else if (t.status === 'in-progress') {
          acc.inProgress += 1;
        } else {
          acc.pending += 1;
        }

        if (t.status !== 'completed' && t.dueDate) {
          const due = new Date(t.dueDate);
          due.setHours(0, 0, 0, 0);
          if (due < today) {
            acc.overdue += 1;
          }
        }
        return acc;
      },
      { total: 0, completed: 0, inProgress: 0, pending: 0, overdue: 0 }
    );
  }, [allTasksForStats]);

  return (
    <div className="app-layout">
      <Navbar isSyncing={isSyncing} />
      
      <main className="main-content container">
        <DashboardStats stats={stats} />

        <div className="content-grid animate-fade-in">
          <TaskForm
            onSubmit={handleCreateOrUpdateTask}
            editTask={editTask}
            onCancel={() => setEditTask(null)}
          />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TaskFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            {tasks.length > 0 ? (
              <div className="task-list">
                {tasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onEdit={setEditTask}
                    onDelete={handleDeleteTask}
                    onStatusToggle={handleStatusToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="task-list-empty animate-fade-in">
                <ClipboardList />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    No Tasks Found
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Try adjusting your filters or create a new task to get started.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Notification toasts={toasts} onClose={removeToast} />
    </div>
  );
};

export default App;
