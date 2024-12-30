import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext();

// eslint-disable-next-line react/prop-types
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const baseURL = 'http://localhost:3000/tasks';

  const fetchTasks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}?page=${page}`);
      setTasks(response.data.tasks || []); // Handle potential undefined response
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(page);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to fetch tasks');
      setTasks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    setLoading(true);
    try {
      await axios.post(baseURL, taskData);
      fetchTasks(currentPage);
    } catch (err) {
      setError('Failed to add task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    setLoading(true);
    try {
      await axios.put(`${baseURL}/${id}`, taskData);
      fetchTasks(currentPage);
    } catch (err) {
      setError('Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${baseURL}/${id}`);
      fetchTasks(currentPage);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        currentPage,
        totalPages,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);