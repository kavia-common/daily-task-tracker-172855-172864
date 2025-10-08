import React, { useEffect, useRef, useState } from 'react';

// PUBLIC_INTERFACE
export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  isEditing
}) {
  /**
   * A single todo item row with:
   * - checkbox to toggle complete
   * - title (double-click to edit)
   * - edit and delete controls
   * - inline edit input with Enter/Esc support
   */
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraft(todo.title);
  }, [todo.title]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmed = draft.trim();
      if (trimmed) {
        onSaveEdit(trimmed);
      } else {
        // empty title cancels but does not save
        onCancelEdit();
      }
    } else if (e.key === 'Escape') {
      onCancelEdit();
      setDraft(todo.title);
    }
  };

  return (
    <div className="todo-item" role="group" aria-label={`Task: ${todo.title}`}>
      <input
        id={`toggle-${todo.id}`}
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      {!isEditing ? (
        <div
          className={`todo-title ${todo.completed ? 'completed' : ''}`}
          onDoubleClick={onStartEdit}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onStartEdit();
          }}
          aria-label={`Title: ${todo.title}. ${todo.completed ? 'Completed.' : 'Active.'} Double-click or press Enter to edit.`}
        >
          {todo.title}
        </div>
      ) : (
        <div className="editing-row">
          <label htmlFor={`edit-${todo.id}`} className="sr-only">Edit task</label>
          <input
            id={`edit-${todo.id}`}
            ref={inputRef}
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Edit task title"
          />
          <div className="actions">
            <button
              className="btn"
              onClick={() => {
                const trimmed = draft.trim();
                if (trimmed) onSaveEdit(trimmed);
              }}
            >
              Save
            </button>
            <button className="btn" onClick={() => { onCancelEdit(); setDraft(todo.title); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="actions" role="toolbar" aria-label="Task actions">
          <button className="action-icon" onClick={onStartEdit} aria-label={`Edit ${todo.title}`}>
            ✏️
          </button>
          <button className="action-icon btn-danger" onClick={onDelete} aria-label={`Delete ${todo.title}`}>
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}
