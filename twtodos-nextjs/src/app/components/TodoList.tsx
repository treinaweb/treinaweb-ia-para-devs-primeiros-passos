import { useTheme } from '../context/ThemeContext';
import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface TodoListProps {
  todos: Todo[];
  updateTodos: (newTodos: Todo[]) => void;
  deleteTodo: (id: string) => void;
}

const TodoList = ({ todos, updateTodos, deleteTodo }: TodoListProps) => {
  const { theme } = useTheme();
  
  const moveTodo = (dragIndex: number, hoverIndex: number) => {
    const newTodos = [...todos];
    const draggedTodo = newTodos[dragIndex];
    
    // Remove the dragged item
    newTodos.splice(dragIndex, 1);
    // Insert it at the new position
    newTodos.splice(hoverIndex, 0, draggedTodo);
    
    updateTodos(newTodos);
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <ul className="w-full rounded-md overflow-hidden shadow-sm">
        {todos.length === 0 ? (
          <li className="p-4 text-center" style={{ 
            background: 'var(--card-bg)', 
            color: 'var(--foreground)',
            opacity: '0.7'
          }}>
            No todos yet. Add one above!
          </li>
        ) : (
          todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              moveTodo={moveTodo}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </ul>
      <div className="text-right text-sm mt-2 pr-2" style={{ color: 'var(--foreground)', opacity: '0.7' }}>
        {todos.length} todo{todos.length !== 1 ? 's' : ''}
      </div>
    </DndProvider>
  );
};

export default TodoList;