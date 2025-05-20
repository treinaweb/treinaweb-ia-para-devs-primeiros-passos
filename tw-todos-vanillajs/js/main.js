// Initialize Bootstrap tooltips and popovers if needed
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
    
    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });

    // DOM Elements
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const todoStats = document.getElementById('todoStats');
    
    // Todo data storage
    let todos = [];

    // Load todos from localStorage
    function loadTodos() {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            todos = JSON.parse(storedTodos);
            renderTodos();
        }
    }

    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Validate a todo
    function isValidTodo(todoText) {
        // Check length (at least 3 characters)
        if (todoText.length < 3) {
            return false;
        }
        
        // Check if first letter is uppercase
        return todoText.charAt(0) === todoText.charAt(0).toUpperCase();
    }

    // Add a new todo
    function addTodo(text) {
        const trimmedText = text.trim();
        
        if (!isValidTodo(trimmedText)) {
            todoInput.classList.add('is-invalid');
            return false;
        }
        
        todos.push({
            id: Date.now().toString(),
            text: trimmedText,
            completed: false
        });
        
        saveTodos();
        renderTodos();
        return true;
    }

    // Delete a todo
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }

    // Update todo ordering
    function updateTodoOrder() {
        const todoElements = Array.from(todoList.children);
        const reorderedTodos = [];
        
        todoElements.forEach((element) => {
            const id = element.dataset.id;
            const todo = todos.find(t => t.id === id);
            if (todo) {
                reorderedTodos.push(todo);
            }
        });
        
        todos = reorderedTodos;
        saveTodos();
    }

    // Render all todos
    function renderTodos() {
        // Clear current list
        todoList.innerHTML = '';
        
        // Create all todo items
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.className = 'list-group-item todo-item d-flex align-items-center justify-content-between';
            todoItem.dataset.id = todo.id;
            
            const todoContent = document.createElement('div');
            todoContent.className = 'd-flex align-items-center';
            
            const dragHandle = document.createElement('span');
            dragHandle.className = 'drag-handle';
            dragHandle.innerHTML = '<i class="bi bi-grip-vertical"></i>';
            
            const todoText = document.createElement('span');
            todoText.textContent = todo.text;
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-sm text-danger todo-delete';
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
            deleteButton.addEventListener('click', () => deleteTodo(todo.id));
            
            todoContent.appendChild(dragHandle);
            todoContent.appendChild(todoText);
            todoItem.appendChild(todoContent);
            todoItem.appendChild(deleteButton);
            todoList.appendChild(todoItem);
        });

        // Update stats
        todoStats.textContent = `${todos.length} todo${todos.length !== 1 ? 's' : ''}`;
    }

    // Initialize Sortable for todo reordering
    function initSortable() {
        new Sortable(todoList, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            handle: '.drag-handle',
            onEnd: updateTodoOrder
        });
    }

    // Event handlers
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const success = addTodo(todoInput.value);
        if (success) {
            todoInput.value = '';
            todoInput.classList.remove('is-invalid');
            todoInput.focus();
        }
    });
    
    todoInput.addEventListener('input', function() {
        todoInput.classList.remove('is-invalid');
    });

    // Initialize the todo app
    loadTodos();
    initSortable();
});