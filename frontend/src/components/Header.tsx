import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">C</span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">CursosPro</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-10">
            <Link to="/courses" className="text-gray-300 hover:text-green-400 transition-colors font-semibold text-lg">Cursos</Link>
            <a href="#instrutores" className="text-gray-300 hover:text-green-400 transition-colors font-semibold text-lg">Instrutores</a>
            <a href="#sobre" className="text-gray-300 hover:text-green-400 transition-colors font-semibold text-lg">Sobre</a>
            <a href="#contato" className="text-gray-300 hover:text-green-400 transition-colors font-semibold text-lg">Contato</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="px-6 py-3 text-gray-300 hover:text-white transition-colors font-semibold text-lg">
              Entrar
            </Link>
            <Link to="/register" className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;




