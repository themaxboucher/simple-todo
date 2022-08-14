export function TaskList({taskList, handleDelete, handleChange}){

    return(
        <div>
            <ul>
                {taskList.map(({title, id}) => (
                    <li className="task" key={id}>
                        <div>
                            <input type="checkbox" onChange={(event) => handleChange(id, event)}></input>
                            <p>{title}</p>
                            <button className="button" onClick={() => handleDelete(id)}>X</button>
                            <button className="button">...</button>
                        </div>
                    </li>                  
                ))}
            </ul>
        </div>
    );
}