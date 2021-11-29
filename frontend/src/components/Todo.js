import React, {useState} from "react";
import {RiCloseCircleLine, RiCheckFill} from "react-icons/ri";

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
            <div className="todoTask">
                <input type="text" defaultValue={todo.task} onChange={handleChange} className="edit-input"></input>
                <button onClick={() => setEdit({taskid: null, task: ""})} className="edit-cancel">
                    <RiCloseCircleLine className="edit-cancel-icon" />
                </button>
                <button onClick={submitUpdate} className="edit-submit">
                    <RiCheckFill className="edit-submit-icon" />
                </button>
            </div>
        );
    };

    // render default task view
    const renderTaskView = (todo) => {
        return (
            <div className="todoTask" onDoubleClick={() => setEdit({taskid: todo.taskid, task: todo.task})}>
                {todo.task}
            </div>
        );
    };

    return todos.map((todo, index) => (
        // todo container
        <div className={todo.isComplete ? "todo-row complete" : "todo-row"} key={index}>
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
            <div className="icons">
                <RiCloseCircleLine onClick={() => removeTodo(todo.taskid)} className="delete-icon" />
                <RiCheckFill onClick={() => completeTodo(todo.taskid)} className="complete-icon" />
            </div>
        </div>
    ));
}

export default Todo;
