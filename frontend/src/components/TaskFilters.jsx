import React from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const TaskFilters = ({ filters, onFilterChange }) => {
  const handleSearchChange = (e) => {
    onFilterChange('search', e.target.value);
  };

  const handleStatusChange = (e) => {
    onFilterChange('status', e.target.value);
  };

  const handlePriorityChange = (e) => {
    onFilterChange('priority', e.target.value);
  };

  const handleSortChange = (e) => {
    onFilterChange('sortBy', e.target.value);
  };

  const toggleSortOrder = () => {
    const nextOrder = filters.order === 'asc' ? 'desc' : 'asc';
    onFilterChange('order', nextOrder);
  };

  return (
    <div className="filter-bar animate-fade-in">
      <div className="filter-search-wrapper">
        <Search className="filter-search-icon" />
        <input
          type="text"
          className="filter-search-input"
          placeholder="Search by title or description..."
          value={filters.search || ''}
          onChange={handleSearchChange}
        />
      </div>

      <div className="filter-selects">
        <div className="filter-select-wrapper">
          <label htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            className="filter-select"
            value={filters.status || ''}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-select-wrapper">
          <label htmlFor="filter-priority">Priority</label>
          <select
            id="filter-priority"
            className="filter-select"
            value={filters.priority || ''}
            onChange={handlePriorityChange}
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="filter-select-wrapper">
          <label htmlFor="filter-sort">Sort By</label>
          <select
            id="filter-sort"
            className="filter-select"
            value={filters.sortBy || 'createdAt'}
            onChange={handleSortChange}
          >
            <option value="createdAt">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>

        <button
          type="button"
          className="sort-dir-btn"
          onClick={toggleSortOrder}
          title={`Sorted ${filters.order === 'asc' ? 'Ascending' : 'Descending'}. Click to reverse.`}
        >
          {filters.order === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;
