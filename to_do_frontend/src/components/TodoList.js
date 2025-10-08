import React from 'react';
import TodoItem from './TodoItem';

// PUBLIC_INTERFACE
export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  editingId
}) {
  /** Renders the list of todos, including an empty state. */
  if (!todos.length) {
    return (
      <div className="card card-surface muted" role="status" aria-live="polite">
        No tasks to show. Add your first task above!
      </div>
    );
  }

  return (
    <ul className="todo-list" aria-label="Todo items">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={() => onToggle(todo.id)}
            onDelete={() => onDelete(todo.id)}
            onStartEdit={() => onStartEdit(todo.id)}
            onCancelEdit={() => onCancelEdit()}
            onSaveEdit={(title) => onSaveEdit(todo.id, title)}
            isEditing={editingId === todo.id}
          />
        </li>
      ))}
    </ul>
  );
}
