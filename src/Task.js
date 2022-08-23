import { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from "react-dnd";

// Icons
import {ReactComponent as TrashIcon} from './icons/button/trash.svg';
import {ReactComponent as CheckIcon} from './icons/button/check.svg';
import {ReactComponent as EditIcon} from './icons/button/edit.svg';
import {ReactComponent as DotsIcon} from './icons/button/dots.svg';

export default function Task({index, id, title, moveTask, done, handleDelete, handleChange, updateTask, theme}){
    
    const [actions, setActions] = useState(false);
    const toggleActions = () => {
        setActions((prev) => prev ? false : true);
    }
  
    const [editor, setEditor] = useState(false);
    const foldTask = () => {
        setEditor(false);
        setActions(false);
    }
  
    const [taskTitle, setTaskTitle] = useState(title);
    
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: "TASK",
        //drop: (item) => moveTask(item),
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }
            // Index of task being dragged
            const dragIndex = item.index;
            //Index of task being hovered over
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveTask(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    });

    const [{ isDragging }, drag] = useDrag({
      type: "TASK",
      item: { id, index },
      canDrag: !editor,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    // Fold task when user clicks outside that task component
    useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setTaskTitle(title);
            foldTask();
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, title]);

    return(
        <div className="task" style={{opacity: isDragging ? "0" : "1", cursor: editor ? "default" : "grab"}} ref={ref} data-handler-id={handlerId}>
  
            <label className="task-info" style={{cursor: actions || editor ? "not-allowed" : "pointer" }}>
                <input className="task-checkbox" type="checkbox" disabled={actions || editor ? true : false} onChange={(event) => {
                    handleChange(id, event);
                    foldTask();
                }}/>
                {!editor &&<p>{title}</p>}
            </label>
                {!editor ? (
                    <div className="task-actions">
                        {actions && !done && (
                            <>
                                <button type="button" onClick={() => setEditor(true)}>
                                    <EditIcon />
                                </button>
                                <button className="danger-btn" type="button" onClick={() => handleDelete(id)}>
                                    <TrashIcon />
                                </button>
                            </>
                        )}

                        {!done ? (
                            <button type="button" onClick={() => toggleActions()} style={{backgroundColor: actions && (theme === "dark" ? "#272A2E" : "#E0E1E1")}}>
                                <DotsIcon />
                            </button>
                        ) : (
                            <button className="danger-btn" type="button" onClick={() => handleDelete(id)}>
                                <TrashIcon />
                            </button>
                        )}
                    </div>                  
                ) : (
                    <>
                    <form className='editor-form' onSubmit={(event) => {
                        event.preventDefault();
                        updateTask(id, taskTitle);
                        foldTask();
                    }}>
                        <input 
                            className="editor-input" 
                            type="text" 
                            value={taskTitle} 
                            onChange={(e) => setTaskTitle(e.target.value)} 
                            autoFocus={true} 
                            maxLength="30"
                            name="title"
                        />

                        <button type="submit">
                            <CheckIcon />
                        </button>
                    </form>
                    </>
                )}
        </div>
    );
}