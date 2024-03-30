import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';

const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task
  };
};

const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    payload: taskId
  };
};

const initialState = {
  tasks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
};

const TaskInput = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      const newTask = { id: Date.now(), name: taskName };
      addTask(newTask);
      setTaskName('');
    }
  };

  return (
    <div className="row mb-3">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task..."
          value={taskName}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-auto">
        <button className="btn btn-primary" type="button" onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <ul className="list-group">
      {tasks.map(task => (
        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
          {task.name}
          <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const store = createStore(reducer);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
    store.dispatch(addTask(task));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    store.dispatch(deleteTask(taskId));
  };

  return (
    <Provider store={store}>
      <div className="container">
        <h1 className="mt-4 mb-3">To-Do List</h1>
        <TaskInput addTask={handleAddTask} />
        <TaskList tasks={tasks} deleteTask={handleDeleteTask} />
      </div>
    </Provider>
  );
};

export default App;



