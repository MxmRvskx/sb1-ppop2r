import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Дашборд</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Активные проекты</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Общая стоимость</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">325,000 руб.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Средний прогресс</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">50%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}