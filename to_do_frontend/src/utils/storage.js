const TODOS_KEY = 'todos';
export const STORAGE_SCHEMA_VERSION = 'v1';

// PUBLIC_INTERFACE
export function loadTodos() {
  /** Safely load todos from localStorage with schema validation. */
  try {
    const raw = localStorage.getItem(TODOS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return [];
    const { version, data } = parsed;
    if (version !== STORAGE_SCHEMA_VERSION || !Array.isArray(data)) return [];
    // Validate minimal fields
    return data
      .filter((t) => t && typeof t.id === 'string' && typeof t.title === 'string')
      .map((t) => ({
        id: String(t.id),
        title: String(t.title),
        completed: Boolean(t.completed),
        createdAt: t.createdAt || Date.now(),
        updatedAt: t.updatedAt || Date.now(),
      }));
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveTodos(todos) {
  /** Safely save todos to localStorage with schema version. */
  try {
    const payload = JSON.stringify({ version: STORAGE_SCHEMA_VERSION, data: todos });
    localStorage.setItem(TODOS_KEY, payload);
  } catch {
    // ignore write errors (e.g., private mode)
  }
}
