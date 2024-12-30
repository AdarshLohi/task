import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import TaskForm from './TaskForm';

const EditTask = () => {
  const { tasks, updateTask } = useTask();
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const currentTask = tasks.find(t => t.id === parseInt(id));
    if (currentTask) {
      setTask(currentTask);
    }
  }, [id, tasks]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateTask(id, values);
      navigate('/');
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm
        initialValues={task}
        onSubmit={handleSubmit}
        buttonText="Update Task"
      />
    </div>
  );
};

export default EditTask;