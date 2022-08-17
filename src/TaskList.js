import { useRef, useCallback } from 'react';
import update from "immutability-helper";
// import useDrag and useDrop hooks from react-dnd
import { useDrag, useDrop } from "react-dnd";

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
            <input type="checkbox" onChange={(event) => handleChange(id, event)}/>
            <p>{title}</p>
            <button className="button" type="button" onClick={() => handleDelete(id)}>X</button>
            <button className="button" type="button">...</button>
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
    }, []);

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