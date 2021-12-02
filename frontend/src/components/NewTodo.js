import React, {useState} from "react";
import {RiImageAddFill} from "react-icons/ri";

function NewTodo(props) {
    const [task, setTask] = useState("");

    const [file, setFile] = useState({
        photo: null,
    });

    // handle change for text input
    const handleChange = (e) => {
        setTask(e.target.value);
    };

    // handle if file is uploaded
    const handleFile = (e) => {
        // frontend filtering of file types
        if (
            e.target.files[0].type !== "image/png" &&
            e.target.files[0].type !== "image/jpg" &&
            e.target.files[0].type !== "image/jpeg" &&
            e.target.files[0].type !== "image/gif"
        ) {
            alert("Only PNG/JPG/GIF files are accepted!");
            return;
        }

        // set state of file
        setFile({
            photo: e.target.files[0],
        });

        // responsse if file accepted
        alert(`${e.target.files[0].name} selected`);
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
            <input type="file" name="photo" id="todo-file" onChange={handleFile} accept="image/*" />
            <label for="todo-file">
                <RiImageAddFill size="3em" />
            </label>
            <button className="todo-submit" style={{backgroundColor: file.photo ? "rgba(50, 205, 50, 50%)" : "white"}}>
                Add Todo
            </button>
        </form>
    );
}

export default NewTodo;
