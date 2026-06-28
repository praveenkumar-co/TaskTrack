import React from 'react';
import { ListTodo, CheckCircle2, PlayCircle, Clock, AlertTriangle } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  const items = [
    {
      label: 'Total Tasks',
      value: stats.total,
      type: 'total',
      icon: ListTodo
    },
    {
      label: 'Completed',
      value: stats.completed,
      type: 'completed',
      icon: CheckCircle2
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      type: 'progress',
      icon: PlayCircle
    },
    {
      label: 'Pending',
      value: stats.pending,
      type: 'pending',
      icon: Clock
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      type: 'overdue',
      icon: AlertTriangle
    }
  ];

  return (
    <div className="dashboard-stats animate-fade-in">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="stat-card">
            <div className={`stat-icon-wrapper ${item.type}`}>
              <Icon size={20} />
            </div>
            <div className="stat-info">
              <h3>{item.label}</h3>
              <div className="stat-value">{item.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
