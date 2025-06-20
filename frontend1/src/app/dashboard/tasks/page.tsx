import { TaskList } from '@/app/components/tasks/TaskList';
import { useTasks } from '@/hooks/useTasks';

export default function TasksPage() {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}