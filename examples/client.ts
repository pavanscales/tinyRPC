// examples/client.ts
import { dispatch } from '../src/core/dispatch.js';
import { appRouter } from './server.js';

async function main() {
  try {
    console.log('Client demo starting...');

    // Add tasks
    const task1 = await dispatch(appRouter.addTask, {}, { title: 'Finish tinyRPC refactor' });
    const task2 = await dispatch(appRouter.addTask, {}, { title: 'Write clean examples' });
    console.log('Added tasks:', task1, task2);

    // List all tasks
    const allTasks = await dispatch(appRouter.listTasks, {}, {});
    console.log('All tasks:', allTasks);

    // Mark first task as done
    const doneTask = await dispatch(appRouter.markDone, {}, { id: 1 });
    console.log('Marked done:', doneTask);

    // List tasks again
    const updatedTasks = await dispatch(appRouter.listTasks, {}, {});
    console.log('Updated tasks:', updatedTasks);

  } catch (err) {
    console.error('Error:', err);
  }
}

// Run client demo
main();
