import { createRouter, procedure } from '../src/core/router.js';
import { z } from 'zod';

// In-memory tasks
const tasks: { id: number; title: string; done: boolean }[] = [];

// Procedures
const addTask = procedure(
  z.object({ title: z.string() }),
  async ({ input }) => {
    const newTask = { id: tasks.length + 1, title: input.title, done: false };
    tasks.push(newTask);
    console.log('Server: task added', newTask);
    return newTask;
  }
);

const listTasks = procedure(z.object({}), async () => {
  console.log('Server: listing tasks');
  return tasks;
});

const markDone = procedure(
  z.object({ id: z.number() }),
  async ({ input }) => {
    const task = tasks.find(t => t.id === input.id);
    if (!task) throw new Error(`Task ${input.id} not found`);
    task.done = true;
    console.log('Server: task marked done', task);
    return task;
  }
);

// Export router
export const appRouter = createRouter({
  addTask,
  listTasks,
  markDone,
} as const);

// Demo run
async function main() {
  console.log('Server demo starting...');
  await addTask.resolver({ input: { title: 'Demo Task 1' }, ctx: {} });
  await addTask.resolver({ input: { title: 'Demo Task 2' }, ctx: {} });
  const all = await listTasks.resolver({ input: {}, ctx: {} });
  console.log('Server demo tasks:', all);

  // Return something if you want
  return all;
}

// Just run it directly — works on Windows, Linux, Mac
main().then((all) => console.log('Main returned:', all));