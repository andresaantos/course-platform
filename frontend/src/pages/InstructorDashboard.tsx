import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, BookOpen, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface InstructorStats {
  totalCourses: number;
  totalStudents: number;
  totalEarnings: number;
  monthlyEarnings: number[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  _count: {
    enrollments: number;
  };
}

export const InstructorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('visao-geral');

  const statsQuery = useQuery({
    queryKey: ['instructor-stats'],
    queryFn: async () => {
      const response = await api.get('/instructor/stats');
      return response.data;
    }
  });

  const coursesQuery = useQuery({
    queryKey: ['instructor-courses'],
    queryFn: async () => {
      const response = await api.get('/instructor/courses');
      return response.data;
    }
  });

  const stats = statsQuery.data;
  const statsLoading = statsQuery.isLoading;
  const courses = coursesQuery.data;
  const coursesLoading = coursesQuery.isLoading;

  if (statsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel do Instrutor</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Criar Curso
        </button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total de Cursos</p>
              <p className="text-2xl font-bold">{(stats as any)?.totalCourses ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total de Alunos</p>
              <p className="text-2xl font-bold">{(stats as any)?.totalStudents ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Ganhos Totais</p>
              <p className="text-2xl font-bold">
                R$ {(stats as any)?.totalEarnings ? (stats as any).totalEarnings.toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Este Mês</p>
              <p className="text-2xl font-bold">
                R$ {(stats as any)?.monthlyEarnings?.[5] ? (stats as any).monthlyEarnings[5].toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Abas */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'visao-geral', label: 'Visão Geral' },
              { key: 'cursos', label: 'Cursos' },
              { key: 'ganhos', label: 'Ganhos' }
            ].map((tab) => (
              <button
                key={tab.key}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'visao-geral' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Visão Geral dos Ganhos</h3>
              <div className="h-64">
                <Bar 
                  data={{
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                      {
                        label: 'Ganhos (R$)',
                        data: (stats as any)?.monthlyEarnings ?? [0, 0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }} 
                />
              </div>
            </div>
          )}

          {activeTab === 'cursos' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Meus Cursos</h3>
              <div className="grid gap-4">
                {courses && Array.isArray(courses) ? courses.map((course: any) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold">{course.title}</h4>
                    <p className="text-gray-600">{course.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">
                        {course._count.enrollments} alunos matriculados
                      </span>
                      <span className="font-bold text-green-600">
                        R$ {course.price}
                      </span>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500">Nenhum curso encontrado.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'ganhos' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Histórico de Ganhos</h3>
              <p className="text-gray-600">Detalhes dos ganhos serão implementados aqui.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};





















