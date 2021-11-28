import React, { useState } from "react";
import NewTodo from "./NewTodo";
import Todo from "./Todo";

function TodoList() {
    const [todos, setTodos] = useState([]);

    // adding new todo
    const addTodo = (todo) => {
        if (!todo.task || /^\s*$/.test(todo.task)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log(todo, ...todos);
    };

    // marking todos as complete
    const completeTodo = (id) => {
        let updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    // marking todos as complete
    const removeTodo = (id) => {
        const removeArr = [...todos].filter((todo) => todo.id !== id);
        setTodos(removeArr);
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
