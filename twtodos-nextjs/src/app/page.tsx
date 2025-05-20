'use client';

import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from './types/Todo';
import { useTheme } from './context/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Validate a todo
  const isValidTodo = (todoText: string): boolean => {
    // Check length (at least 3 characters)
    if (todoText.length < 3) {
      return false;
    }
    
    // Check if first letter is uppercase
    return todoText.charAt(0) === todoText.charAt(0).toUpperCase();
  };

  // Add a new todo
  const addTodo = (text: string): boolean => {
    const trimmedText = text.trim();
    
    if (!isValidTodo(trimmedText)) {
      return false;
    }
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: trimmedText,
      completed: false
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
    return true;
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // Update todos (used for reordering)
  const updateTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <header style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} className="py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TWTodos - GitHub Actions</h1>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-md shadow-md overflow-hidden mb-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} className="p-4">
              <h2 className="text-lg font-semibold">Add New Todo</h2>
            </div>
            <div className="p-4">
              <TodoForm addTodo={addTodo} />
            </div>
          </div>

          <div className="rounded-md shadow-md overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }} className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">My Todos</h2>
              <span className="text-sm">Drag to reorder</span>
            </div>
            <div className="p-0">
              <TodoList 
                todos={todos} 
                updateTodos={updateTodos} 
                deleteTodo={deleteTodo} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
