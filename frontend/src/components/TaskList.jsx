import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../context/TaskContext';

const TaskList = () => {
  const { tasks = [], loading, error, currentPage, totalPages, fetchTasks, deleteTask } = useTask();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks(1);
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => navigate('/create')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>
      {tasks.length === 0 ? (
        <div className="text-center py-4">No tasks found</div>
      ) : (
      <div className="bg-white rounded-lg shadow">
        {tasks.map((task) => (
          <div key={task.id} className="border-b p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <span className={`px-2 py-1 rounded text-sm ${
                task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/edit/${task.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => fetchTasks(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      
    </div>

  );
};

export default TaskList;