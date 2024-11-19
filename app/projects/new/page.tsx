"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddProjectForm } from '@/components/add-project-form';

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProject = async (projectData) => {
    setIsSubmitting(true);
    // Here you would typically send the data to your backend
    // For now, we'll just simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    router.push('/projects');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Создать новый проект</h1>
      <AddProjectForm onAddProject={handleAddProject} isSubmitting={isSubmitting} />
    </div>
  );
}