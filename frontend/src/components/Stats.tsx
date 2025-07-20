import React from 'react';

const Stats = () => {
  const stats = [
    {
      number: '5000+',
      label: 'Cursos Analisados',
      color: 'from-green-400 to-green-600',
      icon: '📚'
    },
    {
      number: '92%',
      label: 'Taxa de Aprovação',
      color: 'from-blue-400 to-blue-600',
      icon: '🎯'
    },
    {
      number: '24/7',
      label: 'Monitoramento',
      color: 'from-purple-400 to-purple-600',
      icon: '⚡'
    },
    {
      number: '150+',
      label: 'Instrutores Parceiros',
      color: 'from-cyan-400 to-cyan-600',
      icon: '👨‍🏫'
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>
      <div className="relative z-10 container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center p-8 bg-gray-800/60 rounded-3xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/60 transition-all duration-500 hover:scale-110 hover:shadow-2xl">
              <div className="text-5xl mb-4 group-hover:animate-bounce">{stat.icon}</div>
              <div className={`text-4xl lg:text-5xl font-black mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.number}
              </div>
              <div className="text-gray-300 text-lg font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

