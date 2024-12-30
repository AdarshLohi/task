// src/components/CreateTask.js
import { useNavigate } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import TaskForm from './TaskForm';

const CreateTask = () => {
  const { addTask } = useTask();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await addTask(values);
      navigate('/');
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <TaskForm
        initialValues={{ title: '', description: '', completed: false }}
        onSubmit={handleSubmit}
        buttonText="Create Task"
      />
    </div>
  );
};

export default CreateTask;