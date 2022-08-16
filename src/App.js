import './App.css';
import NewTask from './NewTask';
import TaskList from './TaskList';
import Header from './Header';
import { useState } from "react";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function App() {
  const [newTask, setNewTask] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewTask((prev) => ({ 
      ...prev, 
      id: Date.now(), 
      [name]: value, 
      done: false,
      index: 1
    }));
  };

  const [taskList, setTaskList] = useState([{title: 'Go add some tasks to this list', id: Date.now(), done: false}]);
  const handleSubmit = (event) => {
    // If no task title do nothing
    event.preventDefault();
    if (!newTask.title) return;
    // Add new task object to task list array
    setTaskList((prev) => [newTask, ...prev]);
    // Set new task varible to empty object
    setNewTask({});
  };
  const handleDelete = (taskIdToRemove) => {
    // Remove task from task list array
    setTaskList((prev) => prev.filter(
      (task) => task.id !== taskIdToRemove
    ));
  };

  const checkTask = (taskIdToCheck, event) => {
    // Toggle task object done property (true or false)
    const toggleDone = (status) => {
      setTaskList((prev) => prev.map(task => {
        if (task.id === taskIdToCheck) {
          return {...task, done: status};
        }
        return task;
      }));
    }
    if (event.target.checked) {
      // If task is checked off...
      toggleDone(true);
      console.log('✅ Checkbox is checked');
    } else {
      // If task is unchecked...
      toggleDone(false);
      console.log('⛔️ Checkbox is NOT checked');
    }
  }
  
  return (
    <div>
        <Header />
      <main>
        <NewTask 
          newTask={newTask}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <DndProvider backend={HTML5Backend}>
          <TaskList 
            taskList={taskList}
            handleDelete={handleDelete}
            handleChange={checkTask}
          />         
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
