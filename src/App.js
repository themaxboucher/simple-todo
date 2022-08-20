import "./App.css";
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import Header from "./Header";
import { useState, createContext, useEffect } from "react";
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
    { title: "#1", id: 1, done: false, index: 1 }, { title: "#2", id: 2, done: false, index: 2 }, { title: "#3", id: 3, done: false, index: 3 },
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

  // Initialize theme state
  const [theme, setTheme] = useState(null);
  
  // Set theme state with system theme settings on mount (on page load)
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // If system settings in dark mode...
      setTheme("dark");
    } else {
      // If system settings in light mode...
      setTheme("light");
    }
  }, [])
  
  // Update (toggle) theme state
  const toggleTheme = () => {
    setTheme(curr => curr === "light" ? "dark" : "light");
  }
  
  // When theme state changes, update root styles to match appropriate theme
  useEffect(() => {
    const styleRoot = document.getElementsByTagName('html')[0].style;
    styleRoot.backgroundColor = theme === "dark" ? "#16171A" : "#fff";
    styleRoot.colorScheme = theme === "dark" ? "dark" : "light";
  }, [theme]);

  return (
    <ThemeContext.Provider value={( theme, toggleTheme )}>
    <div id={theme}>
      <Header handleChange={toggleTheme} theme={theme} />
      <main>
        <div className="wrapper">
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
        </div>
      </main>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
