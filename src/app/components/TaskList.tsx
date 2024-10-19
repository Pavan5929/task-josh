"use client";

import React from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
};

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: number) => void;
  editTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, editTask, toggleCompletion }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
          <button onClick={() => toggleCompletion(task.id)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => editTask(task.id)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
