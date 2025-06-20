import { TaskForm } from '@/app/components/tasks/TaskForm';
import { useCreateTask } from '@/hooks/useTasks';

export default function CreateTaskPage() {
  const createTask = useCreateTask();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create New Task</h1>
      <TaskForm 
        onSubmit={(data) => createTask.mutate(data)} 
        isLoading={createTask.isPending}
      />
    </div>
  );
}