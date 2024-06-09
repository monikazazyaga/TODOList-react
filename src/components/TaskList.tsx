import React from 'react';

interface TaskListProps {
    tasks: Task[];
    handleDeleteTask: (index: number) => void;
    handleToggleTask: (index: number) => void;
}

interface Task {
    text: string;
    completed: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, handleDeleteTask, handleToggleTask }) => {
    return (
        <ul className="myUL">
            {tasks.map((task, index) => (
                <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    <span onClick={() => handleToggleTask(index)}>{task.text}</span>
                    <span>
                        <button className="deleteBtn" onClick={() => handleDeleteTask(index)}>x</button>
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;