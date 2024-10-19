// This file will act as the server component
import { NextResponse } from 'next/server';

export async function fetchTasks() {
  return [
    { id: 1, title: 'Learn Next.js', description: 'Explore SSR and SSG', priority: 'high', completed: false },
    { id: 2, title: 'Grocery Shopping', description: 'Buy vegetables and fruits', priority: 'medium', completed: false },
  ];
}

// Server Component
export default async function TaskPage() {
  const initialTasks = await fetchTasks();

  return (
    <div>
      <h1>Task Management App</h1>
      <div>{JSON.stringify(initialTasks, null, 2)}</div>
    </div>
  );
}
