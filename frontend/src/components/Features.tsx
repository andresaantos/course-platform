import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Cursos Personalizados',
      description: 'IA analisa seu perfil e recomenda os melhores cursos para sua carreira'
    },
    {
      icon: '⚡',
      title: 'Aplicação Automática',
      description: 'Sistema aplica automaticamente para cursos que combinam com você'
    },
    {
      icon: '📊',
      title: 'Análise Inteligente',
      description: 'Algoritmos avançados identificam as melhores oportunidades'
    },
    {
      icon: '🔔',
      title: 'Notificações em Tempo Real',
      description: 'Receba alertas instantâneos sobre novos cursos e oportunidades'
    },
    {
      icon: '📈',
      title: 'Acompanhamento de Progresso',
      description: 'Monitore seu desenvolvimento e conquistas em tempo real'
    },
    {
      icon: '🤝',
      title: 'Rede de Contatos',
      description: 'Conecte-se com outros profissionais e instrutores da área'
    }
  ];

  return (
    <section id="recursos" className="py-24 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Por que escolher o CursosPro?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Oferecemos a melhor experiência de aprendizado online com tecnologia de ponta
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;


