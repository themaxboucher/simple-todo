export function NewTask({newTask, handleChange, handleSubmit}){

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Task name here..."
                    name="title"
                    value={newTask.title || ""}
                    onChange={handleChange}
                />
                <button type="submit" class="small-button">ADD TASK</button>
            </form>
        </div>
    );
}