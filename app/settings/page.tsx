"use client"

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import OperationTypesSettings from '@/components/settings/operation-types-settings';
import ProjectSettings from '@/components/settings/project-settings';

const settingsSections = [
  { id: 'general', label: 'Основные' },
  { id: 'projects', label: 'Проекты' },
  { id: 'finances', label: 'Финансы' },
  { id: 'users', label: 'Пользователи' },
  { id: 'billing', label: 'Тариф и оплата' },
  { id: 'notifications', label: 'Уведомления' },
  { id: 'integrations', label: 'Интеграции' },
  { id: 'security', label: 'Безопасность' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Настройки</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          {settingsSections.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {settingsSections.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <Card>
              <CardHeader>
                <CardTitle>{section.label}</CardTitle>
                <CardDescription>Настройки для раздела {section.label.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                {section.id === 'finances' ? (
                  <OperationTypesSettings />
                ) : section.id === 'projects' ? (
                  <ProjectSettings />
                ) : (
                  <p>Здесь будут настройки для раздела {section.label.toLowerCase()}.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}