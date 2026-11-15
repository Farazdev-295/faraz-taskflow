'use client';

import { useActionState } from 'react';
import { createTaskAction, ActionState } from '@/app/actions/taskActions';

const initialState: ActionState = {
  success: false,
};

export default function TasksPage() {
  const [state, formAction, isPending] = useActionState(createTaskAction, initialState);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
            Server Actions + Zod
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Create New Task</h1>
          <p className="text-sm text-gray-500 mt-1">
            End-to-end type-safe form submission without REST API boilerplate.
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          {/* Task Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Integrate OpenCV Pipeline"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {state.errors?.title && (
              <p className="text-red-600 text-xs mt-1.5">{state.errors.title[0]}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority *
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue="medium"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {state.errors?.priority && (
              <p className="text-red-600 text-xs mt-1.5">{state.errors.priority[0]}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Add task details..."
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg transition"
          >
            {isPending ? 'Validating & Saving...' : 'Create Task'}
          </button>

          {/* Success Banner */}
          {state.success && state.message && (
            <div className="p-3.5 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
              ✅ {state.message}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}