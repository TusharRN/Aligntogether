// TodoForm.js
import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import TodoList from './TodoList';

const TodoForm = () => {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [color, setColor] = useState('#ffffff'); // Default color

    const addTodo = () => {
        if (todoText.trim() === '') return;

        const newTodo = {
            id: Date.now(),
            text: todoText,
            color: color,
            completed: false,
        };

        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setTodoText('');
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    const toggleComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedTodos = Array.from(todos);
        const [reorderedItem] = updatedTodos.splice(result.source.index, 1);
        updatedTodos.splice(result.destination.index, 0, reorderedItem);

        setTodos(updatedTodos);
    };

    return (
        <div>
            <TextField
                label="Add Todo"
                variant="outlined"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button variant="contained" onClick={addTodo}>
                                Add
                            </Button>
                        </InputAdornment>
                    ),
                }}
            />
            <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
            />
            <TodoList
                todos={todos}
                onDelete={deleteTodo}
                onEdit={editTodo}
                onComplete={toggleComplete}
                onDragEnd={handleDragEnd}
            />
        </div>
    );
};

export default TodoForm;