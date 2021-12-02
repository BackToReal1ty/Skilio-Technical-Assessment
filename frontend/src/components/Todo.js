import React, {useState} from "react";
import {RiDeleteBin2Fill, RiSave2Fill} from "react-icons/ri";

function Todo({todos, completeTodo, removeTodo, updateTask}) {
    const [edit, setEdit] = useState({
        taskid: null,
        task: "",
    });

    // submit changes for todo edits
    const submitUpdate = () => {
        // call updateTask to update the task
        updateTask(edit.taskid, edit.task);

        setEdit({
            taskid: null,
            task: "",
        });
    };

    const handleChange = (e) => {
        setEdit({taskid: edit.taskid, task: e.target.value});
    };

    // render input box on double click
    const renderTaskEditView = (todo) => {
        return (
            <div className="todo-task">
                <input type="text" defaultValue={todo.task} onChange={handleChange} className="edit-input"></input>
                <button onClick={() => setEdit({taskid: null, task: ""})} className="edit-cancel">
                    <RiDeleteBin2Fill className="edit-cancel-icon" />
                </button>
                <button onClick={submitUpdate} className="edit-submit">
                    <RiSave2Fill className="edit-submit-icon" />
                </button>
            </div>
        );
    };

    // render default task view
    const renderTaskView = (todo) => {
        return (
            <div className="todo-task" onDoubleClick={() => setEdit({taskid: todo.taskid, task: todo.task})}>
                {todo.task}
            </div>
        );
    };

    return todos.map((todo, index) => (
        // todo container
        <div className="todo-content">
            <div className={todo.isComplete ? "todo-cell complete" : "todo-cell"} key={index}>
                <div key={todo.taskid}>
                    {todo.photo ? (
                        <div className="todoImg">
                            <img src={`http://localhost:8081/tasks/${todo.photo}`} className="taskImg" alt="task" />
                        </div>
                    ) : edit.taskid === todo.taskid ? (
                        renderTaskEditView(todo)
                    ) : (
                        renderTaskView(todo)
                    )}
                </div>
                <div className="actions">
                    <button onClick={() => removeTodo(todo.taskid)} className="delete-icon">
                        Remove task{" "}
                    </button>

                    <button onClick={() => completeTodo(todo.taskid)} className="complete-icon">
                        Mark Task
                    </button>
                </div>
            </div>
        </div>
    ));
}

export default Todo;
