import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { coursesService, Course } from '../services/courses';

export const Courses: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ['courses', search, category, level],
    queryFn: () => coursesService.getCourses({ search, category, level }),
  });

  const categories = ['Programação', 'Design', 'Negócios', 'Marketing', 'Música'];
  const levels = [
    { label: 'INICIANTE', value: 'BEGINNER' },
    { label: 'INTERMEDIÁRIO', value: 'INTERMEDIATE' },
    { label: 'AVANÇADO', value: 'ADVANCED' }
  ];

  const getLevelLabel = (level: string) => {
    const levelMap: { [key: string]: string } = {
      'BEGINNER': 'INICIANTE',
      'INTERMEDIATE': 'INTERMEDIÁRIO', 
      'ADVANCED': 'AVANÇADO'
    };
    return levelMap[level] || level;
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-gray-800">Carregando...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Busca e Filtros */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cursos..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Todos os Níveis</option>
            {levels.map(lvl => (
              <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Cursos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-green-600">
                  R$ {course.price.toFixed(2)}
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {getLevelLabel(course.level)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{course.instructor.firstName} {course.instructor.lastName}</span>
                <span>{course._count.enrollments} alunos</span>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold">
                Ver Curso
              </button>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum curso encontrado.</p>
        </div>
      )}
    </div>
  );
};




