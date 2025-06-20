
import { Task } from '@/app/types/task';
import Link from 'next/link';
import { Button } from '../ui/button';

type TaskCardProps = {
  task: Task;
  detailed?: boolean;
};

export function TaskCard({ task, detailed = false }: TaskCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h3 className="font-medium">{task.title}</h3>
      {detailed && <p className="text-sm text-gray-600">{task.description}</p>}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {task.status} • {task.priority}
        </span>
        {!detailed && (
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/tasks/${task.id}`}>View</Link>
          </Button>
        )}
      </div>
    </div>
  );
}