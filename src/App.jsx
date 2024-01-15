import { FaCheckSquare } from 'react-icons/fa';
import { AddTask, TaskList, TaskFilter } from './components';
import { Toaster } from 'react-hot-toast';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <Toaster position='bottom-right' />
      {/* Task Title */}
      <div className='max-w-lg px-5 m-auto mt-20'>
        <h1 className='flex justify-center text-3xl font-bold underline'>
          My Todo List
          <FaCheckSquare style={{ color: '#42C239' }} />
        </h1>
      </div>
      <AddTask />
      <TaskFilter />
      <TaskList />
    </TaskProvider>
  );
}

export default App;
