import React, {useState} from "react";

function NewTodo(props) {
    const [task, setTask] = useState("");

    const [file, setFile] = useState({
        photo: null,
    });

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    // handle if file is uploaded
    const handleFile = (e) => {
        setFile({
            photo: e.target.files[0],
        });
    };

    const submit = (e) => {
        e.preventDefault();

        // if photo is submitted, always take photo file instead of text input
        if (file.photo !== null) {
            props.onSubmit({
                photo: file.photo,
                isComplete: false,
            });

            setFile({
                photo: null,
            });
        } else {
            props.onSubmit({
                task: task,
                isComplete: false,
            });

            setTask("");
        }
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
            <input type="file" name="photo" className="todo-file" onChange={handleFile} />
            <button className="todo-submit">Add Todo</button>
        </form>
    );
}

export default NewTodo;
