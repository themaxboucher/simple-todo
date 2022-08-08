import './App.css';
import {NewTask} from './NewTask';
import {TaskList} from './TaskList';
import { useState } from "react";

function App() {
  const [newTask, setNewTask] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewTask((prev) => ({ ...prev, id: Date.now(), [name]: value }));
  };

  const [taskList, setTaskList] = useState([{title: 'example task', id: Date.now()}]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask.title) return;
    setTaskList((prev) => [newTask, ...prev]);
    setNewTask({});
  };
  const handleDelete = (taskIdToRemove) => {
    setTaskList((prev) => prev.filter(
      (task) => task.id !== taskIdToRemove
    ));
  };
  
  return (
    <main>
      <h1>Tasks</h1>
      <NewTask 
        newTask={newTask}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <TaskList 
        taskList={taskList}
        handleDelete={handleDelete}
      />
    </main>
  );
}

export default App;
