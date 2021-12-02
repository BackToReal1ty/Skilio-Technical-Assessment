import React, {useState, useEffect} from "react";
import NewTodo from "./NewTodo";
import Todo from "./Todo";
import axios from "axios";

function TodoList() {
    const [todos, setTodos] = useState([]);

    // get todo entries once on first render
    useEffect(() => {
        axios.get("http://localhost:8081/tasks").then((response) => setTodos(response.data));
    }, []);

    // adding new todo
    const addTodo = (todo) => {
        // return and cancel if todo.task is blank
        if ((!todo.task && todo.photo === null) || /^\s*$/.test(todo.task)) {
            return;
        }

        // create new formdata object
        let fd = new FormData();

        // populate formdata object accordingly
        if (!todo.task) {
            fd.append("photo", todo.photo);
            fd.append("isComplete", todo.isComplete);
        } else {
            fd.append("task", todo.task);
            fd.append("isComplete", todo.isComplete);
        }

        // send post request with formdata to backend server
        axios.post("http://localhost:8081/tasks", fd).then(() => {
            // send get request to backend server
            axios.get("http://localhost:8081/tasks").then((response) => {
                setTodos(response.data);
            });
        });
    };

    // marking existing todos as complete
    const completeTodo = (taskid) => {
        let updatedTodos = todos.map((todo) => {
            if (todo.taskid === taskid) {
                todo.isComplete = !todo.isComplete;

                // send post request to backend server
                axios.put(`http://localhost:8081/tasks/${taskid}`, {
                    isComplete: todo.isComplete,
                });
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    // remove existing todos
    const removeTodo = (taskid) => {
        const removeArr = [...todos].filter((todo) => todo.taskid !== taskid);
        setTodos(removeArr);

        // send delete requet to backend server
        axios.delete(`http://localhost:8081/tasks/${taskid}`);
    };

    // edit existing todo task
    const updateTask = (todoId, newValue) => {
        if (!newValue || /^\s*$/.test(newValue)) {
            return;
        }
        // send put request to backend server
        axios.put(`http://localhost:8081/tasks/${todoId}`, {task: newValue}).then(() => {
            // send get requet to backend server
            axios.get("http://localhost:8081/tasks").then((response) => {
                setTodos(response.data);
            });
        });
    };

    return (
        <div>
            <header>
                <h1>React To-Do List</h1>
                by Isaac Ang
                <NewTodo onSubmit={addTodo} />
            </header>

            <div className="todo-list">
                <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTask={updateTask} />
            </div>
        </div>
    );
}

export default TodoList;
