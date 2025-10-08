import React, { useRef, useState } from 'react';

// PUBLIC_INTERFACE
export default function TodoInput({ onAdd }) {
  /** Controlled input for adding a new task. */
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <label htmlFor="new-task" className="sr-only">New task</label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
        <input
          id="new-task"
          ref={inputRef}
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Add a new task and press Enter…"
          aria-label="Add a new task"
        />
        <button className="btn btn-primary" onClick={handleAdd} aria-label="Add task">
          Add
        </button>
      </div>
    </div>
  );
}
