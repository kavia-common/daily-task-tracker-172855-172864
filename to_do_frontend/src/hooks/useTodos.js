import { useCallback, useEffect, useRef, useState } from 'react';
import { loadTodos, saveTodos, STORAGE_SCHEMA_VERSION } from '../utils/storage';

function createTodo(title) {
  const now = Date.now();
  return {
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

// PUBLIC_INTERFACE
export default function useTodos() {
  /**
   * Manages todo list CRUD and localStorage sync.
   * Exposes todos array and operations.
   */
  const [todos, setTodos] = useState(() => loadTodos());
  const [editingId, setEditingId] = useState(null);
  const mounted = useRef(false);

  // persist when todos change
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    saveTodos(todos);
  }, [todos]);

  // schema version migration example (no-op but future-proof)
  useEffect(() => {
    // could handle migrations here if STORAGE_SCHEMA_VERSION changes
    void STORAGE_SCHEMA_VERSION;
  }, []);

  const addTodo = useCallback((title) => {
    setTodos((prev) => [createTodo(title), ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) setEditingId(null);
  }, [editingId]);

  const startEdit = useCallback((id) => {
    setEditingId(id);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  const saveEdit = useCallback((id, newTitle) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle, updatedAt: Date.now() } : t))
    );
    setEditingId(null);
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startEdit,
    cancelEdit,
    saveEdit,
    editingId,
  };
}
