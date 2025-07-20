import api from './api';

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  instructor: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  reviews: { rating: number }[];
  _count: {
    enrollments: number;
  };
}

export const coursesService = {
  getCourses: async (params?: {
    search?: string;
    category?: string;
    level?: string;
  }): Promise<Course[]> => {
    const response = await api.get<Course[]>('/courses', { params });
    return response.data;
  },
};
