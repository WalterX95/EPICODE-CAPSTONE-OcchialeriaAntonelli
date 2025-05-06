import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404Component = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-extrabold text-gray-800 dark:text-gray-200">404</h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Pagina non trovata</p>
      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
      >
        Torna alla Home
      </button>
    </div>
  );
};

export default Error404Component;
