import "./App.css";
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import Header from "./Header";
import { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const ThemeContext = createContext(null);

function App() {
  const [newTask, setNewTask] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewTask((prev) => ({
      ...prev,
      id: Date.now(),
      [name]: value,
      done: false,
      index: 1,
    }));
  };

  const [taskList, setTaskList] = useState([
    { title: "Add some tasks to this list", id: Date.now(), done: false },
  ]);
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
    setTaskList((prev) => prev.filter((task) => task.id !== taskIdToRemove));
  };

  const checkTask = (taskIdToCheck, event) => {
    // Toggle task object done property (true or false)
    const toggleDone = (status) => {
      setTaskList((prev) =>
        prev.map((task) => {
          if (task.id === taskIdToCheck) {
            return { ...task, done: status };
          }
          return task;
        })
      );
    };
    if (event.target.checked) {
      // If task is checked off...
      toggleDone(true);
      console.log("✅ Checkbox is checked");
    } else {
      // If task is unchecked...
      toggleDone(false);
      console.log("⛔️ Checkbox is NOT checked");
    }
  };

  // Get system theme preference
  let systemTheme;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    systemTheme = "dark";
  } else {
    systemTheme = "light";
  }
  // Set system theme preference to default
  const [theme, setTheme] = useState(systemTheme);
  

  const toggleTheme = () => {
    setTheme(curr => curr == "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={( theme, toggleTheme )}>
    <div id={theme}>
      <Header handleChange={toggleTheme} />
      <main>
        <NewTask
          newTask={newTask}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <DndProvider backend={HTML5Backend}>
          <TaskList
            taskList={taskList}
            setTaskList={setTaskList}
            handleDelete={handleDelete}
            handleChange={checkTask}
          />
        </DndProvider>
      </main>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
