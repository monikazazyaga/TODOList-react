import React from 'react';
import { render, screen , fireEvent, getByRole} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App.tsx';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';



test('Отображение заголовка на главной странице', () => {
  render(<App />);
  const titleElement = screen.getByText('Список дел');
  expect(titleElement).toBeInTheDocument();
});

test('Проверка отображения кнопок на главной странице', () => {
    render(<App />);
    const createButton = screen.getByText('Создать');
    const clearButton = screen.getByText('Очистить всё');
  
    expect(createButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });
  
  test('Проверка отображения поля ввода на главной странице', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText('Введите дело...');
    
    expect(inputElement).toBeInTheDocument();
  });
  
  test('Проверка отображения текстовой заглушки для пустого списка', () => {
    render(<App />);
    const emptyPlaceholder = screen.getByText('Сейчас дел нет');
    
    expect(emptyPlaceholder).toBeInTheDocument();
  });







  test('Проверка правильной работы поля ввода', () => {
    const handleCreateTask = jest.fn();
    const handleDeleteAllElements = jest.fn();

    const { getByPlaceholderText, getByText } = render(
        <TaskInput handleCreateTask={handleCreateTask} handleDeleteAllElements={handleDeleteAllElements} />
    );

    const inputElement = getByPlaceholderText('Введите дело...');
    const createButton = getByText('Создать');

    fireEvent.change(inputElement, { target: { value: 'Новая задача' } });
    fireEvent.click(createButton);

    expect(handleCreateTask).toHaveBeenCalledWith('Новая задача');
});


test('Отображение пустого массива тудушек', () => {
  const tasks = [];
  const { container } = render(<TaskList tasks={tasks} />);
  
  const myULElement = container.querySelector('.myUL');
  expect(myULElement?.children.length).toBe(0); 
});

test('Отображение заполненного массива тудушек', () => {
  const tasks = [
      { text: 'Покормить кота', completed: false },
      { text: 'Выгулять собаку', completed: true }
  ];
  const { container } = render(<TaskList tasks={tasks} />);
  
  const myULElement = container.querySelector('.myUL');
  expect(myULElement?.children.length).toBe(tasks.length); 
});




test('Проверка работы кнопок сортировки и отображения задач', () => {
  render(<App />);

  // Подготовим тестовые данные
  const initialTasks = [
    'Task 1',
    'Task 2',
    'Task 3'
  ];

  //  исходные задачи
  initialTasks.forEach(taskText => {
    fireEvent.change(screen.getByPlaceholderText('Введите дело...'), { target: { value: taskText } });
    fireEvent.click(screen.getByText('Создать'));
  });


  expect(screen.queryAllByTestId('task-item').length).toBe(3);

  fireEvent.click(screen.getByText('А-Я'));
  expect(screen.queryAllByTestId('task-item')[0].textContent).toContain('Task 1');

  fireEvent.click(screen.getByText('Я-А'));
  expect(screen.queryAllByTestId('task-item')[0].textContent).toContain('Task 3');

  fireEvent.click(screen.getByText('Всё'));
  expect(screen.queryAllByTestId('task-item').length).toBe(3);
});


