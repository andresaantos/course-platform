import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Aprenda Qualquer Coisa, A Qualquer Hora, Em Qualquer Lugar
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Descubra milhares de cursos de instrutores especialistas
        </p>
        <Link
          to="/courses"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Explorar Cursos
        </Link>
      </div>
    </div>
  );
};
