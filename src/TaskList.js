import update from "immutability-helper";
import { useCallback } from "react";
import Task from "./Task";

export default function TaskList({
  taskList,
  setTaskList,
  handleDelete,
  handleChange,
  theme
}) {
  const updateTask = useCallback((taskIdToCheck, taskTitle) => {
    setTaskList((prev) =>
      prev.map((task) => {
        if (task.id === taskIdToCheck) {
          return { ...task, title: taskTitle };
        }
        return task;
      })
    );
  }, [setTaskList]);

  const moveTask = useCallback((dragIndex, hoverIndex) => {
    setTaskList((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      })
    );
  }, [setTaskList]);

  const renderTask = useCallback((task, index) => {
    return (
      <Task
        key={task.id}
        index={index}
        id={task.id}
        title={task.title}
        moveTask={moveTask}
        done={task.done}
        handleDelete={handleDelete}
        handleChange={handleChange}
        updateTask={updateTask}
        theme={theme}
      />
    );
  }, [handleChange, handleDelete, moveTask, theme, updateTask]);

  return (
    <>
      <div className="task-list">
        {taskList.map((task, i) => renderTask(task, i))}
      </div>
    </>
  );
}
