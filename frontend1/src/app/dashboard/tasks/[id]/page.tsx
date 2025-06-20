import { notFound } from 'next/navigation';
import { useTask } from '@/hooks/useTasks';
import { TaskCard } from '@/app/components/tasks/TaskCard';

export default function TaskPage({ params }: { params: { id: string } }) {
  const { data: task, isLoading, error } = useTask(params.id);

  if (isLoading) return <div>Loading...</div>;
  if (error || !task) return notFound();

  return (
    <div className="space-y-4">
      <TaskCard task={task} detailed />
    </div>
  );
}