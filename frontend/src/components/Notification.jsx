import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const Icon = (() => {
    switch (toast.type) {
      case 'success': return CheckCircle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  })();

  return (
    <div className={`toast toast-${toast.type}`}>
      <div className="toast-icon">
        <Icon size={18} />
      </div>
      <div className="toast-message">
        {toast.message}
      </div>
      <button
        type="button"
        className="toast-close"
        onClick={() => onClose(toast.id)}
      >
        <X size={14} />
      </button>
    </div>
  );
};

const Notification = ({ toasts, onClose }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

export default Notification;
