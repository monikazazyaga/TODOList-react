import React, { useEffect, useState } from 'react';
import Header from './components/Header.tsx';
import TaskInput from './components/TaskInput.tsx';
import TaskList from './components/TaskList.tsx';
import TaskSummary from './components/TaskSummary.tsx';
import Footer from './components/Footer.tsx';
import './styles.css'; 

interface Task {
    text: string;
    completed: boolean;
}

const App = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [originalTasks, setOriginalTasks] = useState<Task[]>([]);

    const handleCreateTask = (inputValue: string) => {
        let newTask = inputValue.trim();
    
        if (newTask) {
            const taskWithDate = { text: `${newTask} (${new Date().toLocaleDateString()})`, completed: false };
            setOriginalTasks([...originalTasks, taskWithDate]);
            setTasks([...tasks, taskWithDate]);
            updateTaskCount([...tasks, taskWithDate]);
        }
    };

    const handleDeleteTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
        updateTaskCount(updatedTasks);
    };

    const handleToggleTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { ...updatedTasks[index], completed: !updatedTasks[index].completed };
        setTasks(updatedTasks);
        updateTaskCount(updatedTasks);
    };

  
    const handleDeleteAllElements = () => {
        setOriginalTasks([]);
        setTasks([]);
        updateTaskCount([]);
    };
    
    const updateTaskCount = (updatedTasks: Task[]) => {
        const completedTasksCount = updatedTasks.filter(task => task.text.includes('✓')).length;
        const incompleteTasksCount = updatedTasks.filter(task => !task.text.includes('✓')).length;
        const totalTasksCount = updatedTasks.length;
    
        const completedCountElement = document.getElementById('completedCount');
        const incompleteCountElement = document.getElementById('incompleteCount');
        const totalCountElement = document.getElementById('totalCount');
    
        if (completedCountElement && incompleteCountElement && totalCountElement) {
            completedCountElement.innerText = completedTasksCount.toString();
            incompleteCountElement.innerText = incompleteTasksCount.toString();
            totalCountElement.innerText = totalTasksCount.toString();
        }
    
        // Toggle placeholder visibility
        const placeholder = document.querySelector('.placeholder') as HTMLElement | null;
        if (placeholder) {
            placeholder.style.display = updatedTasks.length > 0 ? 'none' : 'block';
        }
    };

    
    const handleSortTasksBy = (criteria: 'newest' | 'oldest' | 'az' | 'za') => {
        const sortedTasks = [...tasks];
        if (criteria === 'newest') {
            sortedTasks.sort((a, b) => new Date(b.text.split('(')[1]).getTime() - new Date(a.text.split('(')[1]).getTime());
        } else if (criteria === 'oldest') {
            sortedTasks.sort((a, b) => new Date(a.text.split('(')[1]).getTime() - new Date(b.text.split('(')[1]).getTime());
        } else if (criteria === 'az') {
            sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
        } else if (criteria === 'za') {
            sortedTasks.sort((a, b) => b.text.localeCompare(a.text));
        }
        setTasks(sortedTasks);
    };
    
    const handleFilterTasks = (status: string) => {
        if (status === 'completed') {
            setTasks(originalTasks.filter(task => task.completed));
        } else if (status === 'incomplete') {
            setTasks(originalTasks.filter(task => !task.completed));
        } else {
            setTasks(originalTasks);
        }
        updateTaskCount(tasks); 
    };
    const handleSortArrowClick = () => {
        const sortOptionsElement = document.querySelector('.sort-options') as HTMLDivElement | null;
        if (sortOptionsElement) {
            sortOptionsElement.style.display = sortOptionsElement.style.display === 'none' ? 'block' : 'none';
        }
    };

    return (
        <>
            <Header />
            <div className="task-input">
                <TaskInput handleCreateTask={handleCreateTask} handleDeleteAllElements={handleDeleteAllElements} />
            </div>
            <p className={tasks.length ? 'placeholder hidden' : 'placeholder'}>Сейчас дел нет</p>
            <div className="container">
            <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} handleToggleTask={handleToggleTask} />
                <TaskSummary
                   tasks={tasks}
                    handleSortTasksBy={handleSortTasksBy}
                    handleFilterTasks={handleFilterTasks}
                    handleSortArrowClick={handleSortArrowClick}
                />
            </div>
            <Footer />
        </>
    );
};

export default App;