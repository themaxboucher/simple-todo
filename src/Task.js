import { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from "react-dnd";
import Icon from './Icon';
import { ThemeContext } from './App';

export default function Task({index, id, title, moveTask, done, handleDelete, handleChange}){
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
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    const [actions, setActions] = useState(false);

    const [editor, setEditor] = useState(false);

    const toggleEditor = () => {
        setEditor((prev) => !prev ? true : false);
    }

    const foldTask = () => {
        setEditor(false);
        setActions(false);
    }

    /*
    if (isDragging) {
        foldTask();
    }
    */

    // Fold task when user clicks outside that task component
    useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            foldTask();
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const [taskTitle, setTaskTitle] = useState(title);

    return(
        <div className="task" style={{opacity: isDragging ? "0" : "1", cursor: isDragging ? "grabbing" : "grab"}} ref={ref} data-handler-id={handlerId}>
  
            <label className="task-info">
                <input className="task-checkbox" type="checkbox" onChange={(event) => {
                    handleChange(id, event);
                    foldTask();
                }}/>
                {!editor ? (
                    <p>{title}</p>
                ) : (
                    <input className="editor-input" type="text" value={title} onChange={(event) => setTaskTitle({value: event.target.value})} autoFocus />
                )}
            </label>
  
            <div className="task-actions">
                {actions && !done && (
                    <>
                        <button type="button" onClick={() => toggleEditor()}>
                            {!editor ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="20px">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>

                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" width="20px">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                        <button className="danger-btn" type="button" onClick={() => handleDelete(id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="20px">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </>
                )}

                {!done ? (
                    <button type="button" onClick={() => setActions((prev) => prev ? false : true)} style={ThemeContext === "darK" ? {backgroundColor: actions && "#272A2E"} : {backgroundColor: actions && "#E0E1E1"}}>
                        <Icon d={"M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"} />
                    </button>
                ) : (
                    <button className="danger-btn" type="button" onClick={() => handleDelete(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="20px">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                )}
            </div>
            
        </div> 
    );
}