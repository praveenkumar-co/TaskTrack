const handleResponse = async (response) => {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMsg = payload?.message || `API error (${response.status})`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.errors = payload?.errors || [];
    throw error;
  }

  return payload;
};

export const api = {
  async getTasks(filters = {}) {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const res = await fetch(`/api/tasks?${query.toString()}`);
    return handleResponse(res);
  },

  async createTask(taskData) {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    return handleResponse(res);
  },

  async updateTask(id, taskData) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    return handleResponse(res);
  },

  async deleteTask(id) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  }
};
