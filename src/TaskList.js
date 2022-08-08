export function TaskList({taskList, handleDelete}){

    return(
        <div>
            <ul>
                {taskList.map(({title, id}) => (
                    <li key={id}>
                        <div>
                            <h2>{title}</h2>
                            <button onClick={() => handleDelete(id)}>X</button>
                        </div>
                    </li>                  
                ))}
            </ul>
        </div>
    );
}