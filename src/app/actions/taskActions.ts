'use server';

import { TaskSchema } from '@/types/taskSchema';

export interface ActionState {
  success: boolean;
  message?: string;
  errors?: {
    title?: string[];
    priority?: string[];
    description?: string[];
  };
}

export async function createTaskAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    title: formData.get('title'),
    priority: formData.get('priority'),
    description: formData.get('description') || undefined,
  };

  const parsed = TaskSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Simulated DB insert (Database Day 4 par connect karenge)
  console.log('Validated Task Ready for DB:', parsed.data);

  return {
    success: true,
    message: `Task "${parsed.data.title}" validated & created successfully!`,
  };
}