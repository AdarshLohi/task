// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';

const App = () => {
  return (
    <TaskProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 p-4">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
};

export default App;