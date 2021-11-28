import React, { useState } from "react";

function NewTodo(props) {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            task: input,
        });

        setInput("");
    };

    return (
        <form className="todo-form" onSubmit={submit}>
            <input
                type="text"
                placeholder="Add a Todo"
                value={input}
                name="task"
                className="todo-input"
                onChange={handleChange}
            ></input>
            <button className="todo-submit">Add Todo</button>
        </form>
    );
}

export default NewTodo;
