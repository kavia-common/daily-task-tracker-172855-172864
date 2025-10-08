import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ title, theme, onToggleTheme, counts }) {
  /** Header showing app title, task counter and theme toggle button. */
  return (
    <header className="header container">
      <div className="brand">
        <h1 className="title" aria-label={`${title} application`}>{title}</h1>
        <span className="counter" aria-live="polite">
          {counts.active} active / {counts.total} total
        </span>
      </div>
      <button
        className="btn"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
}
