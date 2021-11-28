import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import NewTodo from "./NewTodo";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        value: "",
    });

    const submitUpdate = (value) => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: "",
        });
    };

    if (edit.id) {
        return <NewTodo edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo, index) => (
        // todo container
        <div
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
            key={index}
        >
            <div key={todo.taskid} onClick={() => completeTodo(todo.taskid)}>
                {todo.photo ? (
                    <img
                        src={`http://localhost:8081/tasks/${todo.photo}`}
                        className="taskImg"
                        alt="task"
                    />
                ) : (
                    todo.task
                )}
            </div>
            <div className="icons">
                <RiCloseCircleLine
                    onClick={() => removeTodo(todo.taskid)}
                    className="delete-icon"
                />

                {/* change */}
                <TiEdit
                    onClick={() => setEdit({ id: todo.id, value: todo.task })}
                    className="edit-icon"
                />
            </div>
        </div>
    ));
}

export default Todo;
