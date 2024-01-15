import { BsCheck2Square } from 'react-icons/bs';
import { TbRefresh } from 'react-icons/tb';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { useContext, useState } from 'react';
import { TaskInput } from './TaskInput';
import { TaskContext } from '../context/TaskContext';

export const TaskList = () => {
  // fetch data from context
  const { tasks, updateTaskStatus, editTask, deleteTask } = useContext(TaskContext);

  // States to control edit button
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  const handleEditTask = (taskId, taskTitle) => {
    setEditTaskId(taskId);
    setEditTaskTitle(taskTitle);
  };

  function runEditTask() {
    editTask(editTaskId, editTaskTitle);
    setEditTaskId(null);
    setEditTaskTitle('');
    toast.success('Task title updated!');
  }

  return (
    <ul className='grid max-w-lg gap-2 px-5 m-auto'>
      {tasks.map(task => (
        <li
          key={task.id}
          className={`p-5 rounded-xl bg-zinc-200 ${
            task.completed ? 'bg-opacity-50 text-zinc-500' : ''
          }`}
        >
          {editTaskId === task.id ? (
            <div className='flex gap-2'>
              <TaskInput
                value={editTaskTitle}
                onChange={event => setEditTaskTitle(event.target.value)}
              />
              <button
                className='px-5 py-2 text-white bg-green-500 border-2 border-transparent rounded-lg hover:bg-green-700'
                onClick={() => runEditTask(task.id)}
              >
                Update
              </button>
            </div>
          ) : (
            <div className='flex flex-col gap-5'>
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.title}
              </span>
              <div className='flex justify-between gap-5'>
                <button onClick={() => updateTaskStatus(task.id)}>
                  {task.completed ? (
                    <span className='flex items-center gap-1 hover:underline'>
                      <TbRefresh />
                      Set Active
                    </span>
                  ) : (
                    <span className='flex items-center gap-1 hover:underline'>
                      <BsCheck2Square />
                      Set Completed
                    </span>
                  )}
                </button>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => handleEditTask(task.id, task.title)}
                    className='flex items-center gap-1 hover:underline'
                  >
                    <FaRegEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className='flex items-center gap-1 text-red-500 hover:underline'
                  >
                    <RiDeleteBin7Line />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
