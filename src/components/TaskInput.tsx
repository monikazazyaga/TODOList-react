import React, { useState } from 'react';

const TaskInput = ({ handleCreateTask, handleDeleteAllElements }) => {
    const [taskInput, setTaskInput] = useState('');

    const handleChange = (event) => {
        setTaskInput(event.target.value);
    };

    const handleClickCreate = () => {
        handleCreateTask(taskInput);
        setTaskInput('');
    };

    return (
        <div className="task-input">
            <input type="text" className="myInput" placeholder="Введите дело..." value={taskInput} onChange={handleChange} />
            <button className="addBtn" onClick={handleClickCreate}>Создать</button>
            <button className="cleanBtn" onClick={handleDeleteAllElements}>Очистить всё</button>
        </div>
    );
};

export default TaskInput;