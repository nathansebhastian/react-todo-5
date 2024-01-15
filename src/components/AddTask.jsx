import { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { TaskInput } from './TaskInput';

import { TaskContext } from '../context/TaskContext';

export const AddTask = () => {

  const { addTask } = useContext(TaskContext);

  const [title, setTitle] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (title.trim() !== '') {
      addTask(title);
      setTitle('');
      toast.success('New Task added!');
    } else {
      toast.error('Task field cannot be empty!');
    }
  };

  return (
    <form>
      <div className='flex items-center w-full max-w-lg gap-2 p-5 m-auto'>
        <TaskInput
          placeholder='start typing ...'
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <button
          onClick={handleSubmit}
          type='submit'
          className='px-5 py-2 text-white bg-blue-500 border-2 border-transparent rounded-lg hover:bg-blue-700'
        >
          Submit
        </button>
      </div>
    </form>
  );
};
