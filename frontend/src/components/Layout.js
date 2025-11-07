import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="bg-gradient-to-r from-blue-600 to-purple-500 dark:from-gray-800 dark:to-gray-700 shadow-md text-white">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold tracking-wide">🌐 LinkKeep</h1>
          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <button
              onClick={logout}
              className="px-3 py-1 border border-white rounded hover:bg-white hover:text-blue-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </div>
  );
}
