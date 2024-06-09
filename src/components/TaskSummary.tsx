import React, { useEffect, useState } from 'react';

interface Task {
    text: string;
    completed: boolean;
}

interface TaskSummaryProps {
    handleSortTasksBy: (criteria: 'newest' | 'oldest' | 'az' | 'za') => void;
    handleFilterTasks: (status: string) => void;
    handleSortArrowClick: () => void;
    tasks: Task[]; 
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ handleSortArrowClick, handleSortTasksBy, handleFilterTasks, tasks }) => {
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [incompleteTasksCount, setIncompleteTasksCount] = useState(0);
    const [totalTasksCount, setTotalTasksCount] = useState(0);

    const updateCounts = () => {
        const completedCount = tasks.filter(task => task.completed).length;
        const incompleteCount = tasks.filter(task => !task.completed).length;
        const totalTasksCount = tasks.length;

        setCompletedTasksCount(completedCount);
        setIncompleteTasksCount(incompleteCount);
        setTotalTasksCount(totalTasksCount);
    };

    const handleFilter = (status: string) => {
        handleFilterTasks(status);
        updateCounts();
    };

    // Обновляем счетчики при изменении задач
    useEffect(() => {
        updateCounts();
    }, [tasks]);

    return (
        <div className="task-summary">
            <div className="task-count">
                <span className="count" onClick={() => handleFilter('completed')}>Сделано: <span>{completedTasksCount}</span></span>
                <span className="count" onClick={() => handleFilter('incomplete')}>Не сделано: <span>{incompleteTasksCount}</span></span>
                <span className="count" onClick={() => handleFilter('all')}>Всё: <span>{totalTasksCount}</span></span>
            </div>
            <img src="arrow.png" alt="arrow-icon" width="20" height="20" className="sort-arrow" onClick={handleSortArrowClick} />
            <div className="sort-options" style={{ display: 'none' }}>
                <a href="#" onClick={() => handleSortTasksBy('newest')}>Самые новые</a>
                <a href="#" onClick={() => handleSortTasksBy('oldest')}>Самые старые</a>
                <a href="#" onClick={() => handleSortTasksBy('az')}>А-Я</a>
                <a href="#" onClick={() => handleSortTasksBy('za')}>Я-А</a>
            </div>
        </div>
    );
};

export default TaskSummary;