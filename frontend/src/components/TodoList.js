import React, { useState, useEffect } from "react";
import NewTodo from "./NewTodo";
import Todo from "./Todo";
import axios from "axios";

function TodoList() {
    const [todos, setTodos] = useState([]);

    // get todo entries once on first render
    useEffect(() => {
        axios
            .get("http://localhost:8081/tasks")
            .then((response) => setTodos(response.data));
    }, []);

    // adding new todo
    const addTodo = (todo) => {
        if (!todo.task || /^\s*$/.test(todo.task)) {
            return;
        }

        // send post requet to backend server
        axios.post("http://localhost:8081/tasks", todo).then(() => {
            console.log("successful post");
            // send post requet to backend server
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

                // send post requet to backend server
                axios
                    .put(`http://localhost:8081/tasks/${taskid}`, {
                        isComplete: todo.isComplete,
                    })
                    .then(() => {
                        console.log("successful post");
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
        axios.delete(`http://localhost:8081/tasks/${taskid}`).then(() => {
            console.log("successful delete");
        });
    };

    // edit existing todos
    const updateTodo = (todoId, newValue) => {
        if (!newValue.task || /^\s*$/.test(newValue.task)) {
            return;
        }

        setTodos((prev) =>
            prev.map((item) => (item.id === todoId ? newValue : item))
        );
    };

    return (
        <div>
            <h1>Whats the plan for today?</h1>
            <NewTodo onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    );
}

export default TodoList;
