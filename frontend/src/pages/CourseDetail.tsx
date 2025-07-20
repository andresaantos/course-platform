import React from 'react';
import { useParams } from 'react-router-dom';

export const CourseDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Course Detail - {id}</h1>
      <p>Course details will be implemented here.</p>
    </div>
  );
};