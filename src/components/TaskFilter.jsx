import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export const TaskFilter = () => {
  const { filterTasks } = useContext(TaskContext);

  return (
    <div className='flex justify-end items-center max-w-lg px-5 m-auto my-2'>
      <label
        htmlFor='filter'
        className='w-28 font-medium text-gray-900 text-right pe-2'
      >
        Filter Tasks:
      </label>
      <select
        id='filter'
        className='w-28 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5'
        defaultValue='All'
        onChange={event => filterTasks(event.target.value)}
      >
        <option value='all'>All</option>
        <option value='completed'>Completed</option>
        <option value='active'>Active</option>
      </select>
    </div>
  );
};
