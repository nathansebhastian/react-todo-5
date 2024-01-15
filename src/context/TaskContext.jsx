import { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-hot-toast';

export const TaskContext = createContext();

const BASE_API_URL = 'http://localhost:3000/tasks';

export const TaskProvider = props => {
  const [tasks, setTasks] = useState([]);

  const getData = async filter => {
    let parameter = '';
    if (filter === 'completed') {
      parameter = '?completed=true';
    } else if (filter === 'active') {
      parameter = '?completed=false';
    }

    const tasksJson = await fetch(BASE_API_URL + parameter);
    const tasks = await tasksJson.json();
    setTasks(tasks);
  };

  useEffect(() => {
    getData();
  }, []);

  const addTask = async title => {
    const newTask = {
      title: title,
      completed: false,
      id: nanoid(),
    };

    const response = await fetch(BASE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      getData();
    }
  };

  const updateTaskStatus = async taskId => {
    const taskToUpdate = tasks.find(task => task.id === taskId);

    taskToUpdate.completed = !taskToUpdate.completed;

    const response = await fetch(BASE_API_URL + '/' + taskId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskToUpdate),
    });

    if (response.ok) {
      toast.success('Task status updated!');
      getData();
    }
  };

  const editTask = async (taskId, editTaskTitle) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);

    taskToUpdate.title = editTaskTitle;

    const response = await fetch(BASE_API_URL + '/' + taskId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskToUpdate),
    });
    if (response.ok) {
      getData();
    }
  };

  const deleteTask = async taskId => {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      const response = await fetch(BASE_API_URL + '/' + taskId, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Task Deleted!');
        getData();
      }
    }
  };

  const filterTasks = filter => {
    getData(filter);
  };

  const value = {
    tasks,
    addTask,
    updateTaskStatus,
    editTask,
    deleteTask,
    filterTasks,
  };

  return (
    <TaskContext.Provider value={value}>{props.children}</TaskContext.Provider>
  );
};
