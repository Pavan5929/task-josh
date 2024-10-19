"use client";

import { useState } from 'react';

type Task = {
  id?: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
};

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Task) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [priority, setPriority] = useState<Task['priority']>(initialTask?.priority || 'low'); // Ensure the state is typed correctly

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: initialTask?.id, title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('low');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        required
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value as Task['priority'])} // Type assertion here
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">{initialTask ? 'Update Task' : 'Add Task'}</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
