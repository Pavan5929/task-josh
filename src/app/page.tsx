"use client";

import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks } from './tasks/page'; // Adjust the path as needed

type Task = {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState<'title' | 'priority' | 'completed'>('title');

  useEffect(() => {
    const loadTasks = async () => {
      const initialTasks = await fetchTasks();
      setTasks(initialTasks);
    };
    loadTasks();
  }, []);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
    setIsEditMode(false);
    setTaskToEdit(null);
  };

  const toggleCompletion = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Sorting tasks based on the selected criteria
  const sortedTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortCriteria === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortCriteria === 'priority') {
        return a.priority.localeCompare(b.priority);
      } else {
        return Number(a.completed) - Number(b.completed);
      }
    });

  return (
    <div>
      <h1>Task Management App</h1>
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{ margin: '10px 0', padding: '5px', width: '300px' }} 
      />
      <select onChange={(e) => setSortCriteria(e.target.value as 'title' | 'priority' | 'completed')} style={{ margin: '10px 0' }}>
        <option value="title">Sort by Title</option>
        <option value="priority">Sort by Priority</option>
        <option value="completed">Sort by Completion</option>
      </select>
      {isEditMode && taskToEdit ? (
        <TaskForm
          initialTask={taskToEdit}
          onSubmit={(updatedTask: Task) => editTask(taskToEdit.id, updatedTask)}
          onCancel={() => {
            setIsEditMode(false);
            setTaskToEdit(null);
          }}
        />
      ) : (
        <TaskForm onSubmit={(newTask: Task) => addTask(newTask)} />
      )}
      <TaskList
        tasks={sortedTasks}
        deleteTask={deleteTask}
        editTask={(id: number) => {
          const task = tasks.find((t) => t.id === id);
          if (task) {
            setTaskToEdit(task);
            setIsEditMode(true);
          }
        }}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
}
