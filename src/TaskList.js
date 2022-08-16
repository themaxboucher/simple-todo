import React, { useRef } from "react";
// import useDrag and useDrop hooks from react-dnd
import { useDrag, useDrop } from "react-dnd";

function Task({title, id, handleDelete, handleChange}){
    // Drag functionality
    const [{isDragging}, drag] = useDrag(() => ({
        type: "TASK",
        item: { index: 1 },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging() // Returns boolean 
        })
    }));

    // Drop functionality
    const [{isOver}, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => moveTask(item.index),
        collect: (monitor) => ({
            isOver: !!monitor.isOver() // Returns boolean
        })
    }));

    const moveTask = (index) => {
        console.log(index);
    };

    return(
        <div className="task" style={{cursor: isDragging ? "grabbing" : "grab" }} ref={drag} key={id}>
            <input type="checkbox" onChange={(event) => handleChange(id, event)}/>
            <p>{title}</p>
            <button className="button" type="button" onClick={() => handleDelete(id)}>X</button>
            <button className="button" type="button">...</button>
        </div> 
    );
}

export default function TaskList({taskList, handleDelete, handleChange}){

    return(
        <div className="task-list">
                {taskList.map(({title, id}) => (
                    <Task
                        title={title}
                        id={id}
                        handleDelete={handleDelete}
                        handleChange={handleChange}
                    />
                ))}
        </div>
    );
}