import { useRef, useCallback } from 'react';
import update from "immutability-helper";
// import useDrag and useDrop hooks from react-dnd
import { useDrag, useDrop } from "react-dnd";
import EditTask from './EditTask';

function Task({title, id, index, handleDelete, handleChange, moveTask}){
    const ref = useRef(null);

    // Drop functionality
    const [{isOver, handlerId}, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => moveTask(item.index),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(), // Returns 
            handlerId: monitor.getHandlerId()
        }),
        hover(item, monitor) {
            if (!ref.current) {
              return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
              return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
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
            moveTask(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
          },
    }));

    /*
    const moveTask = (index) => {
        console.log(index);
    };
    */

    // Drag functionality
    const [{isDragging}, drag] = useDrag(() => ({
        type: "TASK",
        item: { index: 5 },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging() // Returns boolean 
        })
    }));

    drag(drop(ref));
    return(
        <div className="task" style={{cursor: isDragging ? "grabbing" : "grab", opacity: isDragging ? "0" : "1", border: isOver ? "solid #705df2" : "none"}} ref={ref} data-handler-id={handlerId} key={id}>

            <label className="task-info">
              <input className="task-checkbox" type="checkbox" onChange={(event) => handleChange(id, event)}/>
              <p>{title}</p>
            </label>


            <button style={{display: "none"}} className="danger-btn" type="button" onClick={() => handleDelete(id)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="20px">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="20px">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
            <EditTask />
        </div> 
    );
}

export default function TaskList({taskList, setTaskList, handleDelete, handleChange}){

    const moveTask = useCallback((dragIndex, hoverIndex) => {
        setTaskList((prev) =>
          update(prev, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prev[dragIndex]]
            ]
          })
        );
    }, [setTaskList]);

    return(
        <div className="task-list">
                {taskList.map(({title, id, index}) => (

                    <Task
                        title={title}
                        id={id}
                        key={id}
                        index={index}
                        handleDelete={handleDelete}
                        handleChange={handleChange}
                        moveTask={moveTask}
                    />
                ))}
        </div>
    );
}