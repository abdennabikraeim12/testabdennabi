import { Task } from '@/app/types/task';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Button } from '../ui/button';


type TaskFormProps = {
  onSubmit: (data: Omit<Task, 'id' | 'createdAt'>) => void;
  isLoading?: boolean;
  initialData?: Partial<Task>;
};

export function TaskForm({ onSubmit, isLoading, initialData }: TaskFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('title', { required: true })}
        placeholder="Task title"
      />
      <Textarea
        {...register('description')}
        placeholder="Description"
      />
      <Select {...register('status')}>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </Select>
      <Select {...register('priority')}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Task'}
      </Button>
    </form>
  );
}