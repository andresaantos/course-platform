import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            CursosPro
          </Link>
          <div className="flex space-x-4">
            <Link to="/courses" className="text-gray-700 hover:text-blue-600">
              Cursos
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Entrar
            </Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

