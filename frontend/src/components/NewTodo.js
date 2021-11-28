import React, { useState } from "react";

function NewTodo(props) {
    const [task, setTask] = useState("");

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        props.onSubmit({
            task: task,
            isComplete: false,
        });

        setTask("");
    };

    return (
        <form className="todo-form" onSubmit={submit}>
            <input
                type="text"
                placeholder="Add a Todo"
                value={task}
                name="task"
                className="todo-input"
                onChange={handleChange}
            ></input>
            <button className="todo-submit">Add Todo</button>
        </form>
    );
}

export default NewTodo;
