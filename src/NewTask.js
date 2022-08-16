export default function NewTask({newTask, handleChange, handleSubmit}){

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    className="input"
                    type="text"
                    autoFocus={true} 
                    maxLength="75"
                    placeholder="Add new task"
                    name="title"
                    value={newTask.title || ""}
                    onChange={handleChange}
                />
                <button className="button" type="submit">+</button>
            </form>
        </div>
    );
}