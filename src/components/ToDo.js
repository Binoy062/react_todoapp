// src/components/ToDo.js
import React, { useState, useEffect } from 'react';
import './ToDo.css';

const ToDo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim() === '') return;
        const task = { id: Date.now(), text: newTask, completed: false };
        setTasks([...tasks, task]);
        setNewTask('');
    };

    const handleRemoveTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleToggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOrder === 'asc') return a.text.localeCompare(b.text);
        return b.text.localeCompare(a.text);
    });

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <div className="todo-input">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className="todo-filter-sort">
                <label>
                    Filter:
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </label>
                <label>
                    Sort:
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
            <ul>
                {sortedTasks.map(task => (
                    <li key={task.id}>
                        <span
                            className={task.completed ? 'completed' : ''}
                            onClick={() => handleToggleComplete(task.id)}
                        >
                            {task.text}
                        </span>
                        <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDo;
