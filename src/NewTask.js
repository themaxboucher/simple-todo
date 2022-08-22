export default function NewTask(props){
    return (
        <div>
            <form className="new-task" onSubmit={props.handleSubmit}>
                <input 
                    className="input"
                    type="text"
                    autoFocus={true} 
                    maxLength="30"
                    placeholder="Add new task"
                    name="title"
                    value={props.newTask.title || ""}
                    onChange={props.handleChange}
                />
                <button className="button" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.75" width="20px">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </form>
        </div>
    );
}