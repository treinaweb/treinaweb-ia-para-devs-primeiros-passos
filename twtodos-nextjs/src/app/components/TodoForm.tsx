import { useState, FormEvent } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

interface TodoFormProps {
  addTodo: (text: string) => boolean;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const success = addTodo(text);
    
    if (success) {
      setText('');
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setIsInvalid(false);
          }}
          className="flex-1 px-4 py-2 rounded-l-md focus:outline-none"
          style={{ 
            color: 'var(--foreground)',
            backgroundColor: 'var(--card-bg)',
            borderColor: isInvalid ? 'var(--error)' : 'var(--input-border)',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
          placeholder="Enter your todo..."
          minLength={3}
          required
        />
        <button
          type="submit"
          style={{ 
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)'
          }}
          className="px-4 py-2 rounded-r-md transition-colors flex items-center hover:opacity-90"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Add
        </button>
      </div>
      {isInvalid && (
        <div style={{ color: 'var(--error)' }} className="text-sm mt-1">
          Todo must have at least 3 characters and start with a capital letter.
        </div>
      )}
    </form>
  );
};

export default TodoForm;