import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import useTodos from './hooks/useTodos';

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the main application component for the to-do list app.
   * It composes the Header, TodoInput, and TodoList components and manages the theme and filter state.
   * Theme is applied via data-theme attribute on the documentElement to allow CSS variable theming.
   */

  const { todos, addTodo, toggleTodo, deleteTodo, startEdit, cancelEdit, saveEdit, editingId } = useTodos();

  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage for persistence
    try {
      const stored = localStorage.getItem('theme');
      return stored || 'light';
    } catch {
      return 'light';
    }
  });
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const onToggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const counts = useMemo(() => {
    const active = todos.filter((t) => !t.completed).length;
    const completed = todos.length - active;
    return { total: todos.length, active, completed };
  }, [todos]);

  return (
    <div className="app-root">
      <Header
        title="Ocean Tasks"
        theme={theme}
        onToggleTheme={onToggleTheme}
        counts={counts}
      />

      <main className="container" role="main">
        <section aria-labelledby="add-task-section" className="card card-surface">
          <h2 id="add-task-section" className="sr-only">Add a task</h2>
          <TodoInput onAdd={addTodo} />
        </section>

        <section aria-labelledby="tasks-section" className="card card-surface">
          <div className="list-header">
            <h2 id="tasks-section" className="section-title">Your Tasks</h2>
            <div className="filters" role="tablist" aria-label="Filter tasks">
              <button
                role="tab"
                aria-selected={filter === 'all'}
                className={`chip ${filter === 'all' ? 'chip-active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({counts.total})
              </button>
              <button
                role="tab"
                aria-selected={filter === 'active'}
                className={`chip ${filter === 'active' ? 'chip-active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Active ({counts.active})
              </button>
              <button
                role="tab"
                aria-selected={filter === 'completed'}
                className={`chip ${filter === 'completed' ? 'chip-active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed ({counts.completed})
              </button>
            </div>
          </div>

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onStartEdit={startEdit}
            onCancelEdit={cancelEdit}
            onSaveEdit={saveEdit}
            editingId={editingId}
          />
        </section>
      </main>

      <footer className="footer">
        <p className="muted">Tip: Double-click a task title to edit. Press Enter to save, Esc to cancel.</p>
      </footer>
    </div>
  );
}

export default App;
