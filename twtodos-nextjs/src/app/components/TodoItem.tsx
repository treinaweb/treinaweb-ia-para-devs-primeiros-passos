import { Todo } from '../types/Todo';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { TrashIcon, Bars2Icon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

interface TodoItemProps {
  todo: Todo;
  index: number;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
  deleteTodo: (id: string) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const TodoItem = ({ todo, index, moveTodo, deleteTodo }: TodoItemProps) => {
  const { theme } = useTheme();
  const ref = useRef<HTMLLIElement>(null);
  
  // Drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: 'TODO',
    item: { index, id: todo.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  // Drop functionality
  const [, drop] = useDrop({
    accept: 'TODO',
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Move the item
      moveTodo(dragIndex, hoverIndex);
      
      // Update the index for the dragged item
      item.index = hoverIndex;
    },
  });
  
  // Combine drag and drop refs
  drag(drop(ref));
  
  return (
    <li 
      ref={ref} 
      data-id={todo.id}
      style={{
        background: isDragging ? 'var(--todo-drag)' : 'var(--card-bg)',
        borderColor: 'var(--card-border)',
        color: 'var(--foreground)',
      }}
      className="flex items-center justify-between p-3 border-b cursor-move transition-colors hover:bg-opacity-50"
    >
      <div className="flex items-center">
        <span className="cursor-grab mr-2" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
          <Bars2Icon className="h-5 w-5" />
        </span>
        <span>{todo.text}</span>
      </div>
      <button 
        onClick={() => deleteTodo(todo.id)} 
        style={{ color: 'var(--error)' }}
        className="hover:opacity-80 transition-opacity"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </li>
  );
};

export default TodoItem;