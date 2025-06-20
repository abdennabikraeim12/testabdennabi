import Link from 'next/link';
import { TaskCard } from './TaskCard';
import { Task } from '@/app/types/task';
import { Button } from '../ui/button';


interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Tasks</h2>
        <Button asChild>
          <Link href="/dashboard/tasks/create">
            Create New Task
          </Link>
        </Button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
              <TaskCard task={task} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}