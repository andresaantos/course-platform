import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Sua Carreira Tech,
          </span>
          <br />
          <span className="bg-gradient-to-r from-green-400 via-green-500 to-blue-500 bg-clip-text text-transparent">
            Automatizada
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Descubra e candidate-se automaticamente às melhores oportunidades de tecnologia. 
          CursosPro analisa milhares de cursos e encontra os que combinam perfeitamente com seu perfil, 
          enviando recomendações personalizadas enquanto você foca no que realmente importa.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link 
            to="/register"
            className="px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-2xl"
          >
            ✨ Começar Agora
          </Link>
          <Link 
            to="/login"
            className="px-12 py-4 border-2 border-gray-600 hover:border-green-500 rounded-2xl font-bold text-xl transition-all hover:bg-green-500/10"
          >
            🚀 Fazer Login
          </Link>
        </div>

        {/* Stats preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-black text-green-400 mb-2">5000+</div>
            <div className="text-gray-400">Cursos Analisados</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-400 mb-2">92%</div>
            <div className="text-gray-400">Taxa de Aprovação</div>
          </div>
          <div>
            <div className="text-3xl font-black text-purple-400 mb-2">24/7</div>
            <div className="text-gray-400">Monitoramento</div>
          </div>
          <div>
            <div className="text-3xl font-black text-yellow-400 mb-2">150+</div>
            <div className="text-gray-400">Instrutores Parceiros</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


