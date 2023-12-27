// TodoList.js
import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const TodoList = ({ todos, onDelete, onEdit, onComplete, onDragEnd }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {todos.map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                {(provided) => (
                                    <ListItem
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            backgroundColor: todo.color,
                                            textDecoration: todo.completed ? 'line-through' : 'none',
                                        }}
                                    >
                                        <ListItemText primary={todo.text} />
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={() => onDelete(todo.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => {
                                                    const newText = prompt('Enter new text:', todo.text);
                                                    if (newText !== null) onEdit(todo.id, newText);
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <Checkbox
                                                edge="end"
                                                onChange={() => onComplete(todo.id)}
                                                checked={todo.completed}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TodoList;