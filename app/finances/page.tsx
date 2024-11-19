"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddOperationForm } from '@/components/add-operation-form';
import { OperationsList } from '@/components/operations-list';

export default function FinancesPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Финансы</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Отменить' : 'Добавить операцию'}
        </Button>
      </div>

      {showAddForm && <AddOperationForm onAddOperation={() => setShowAddForm(false)} />}

      <OperationsList />
    </div>
  );
}