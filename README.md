

# TinyRPC

**TinyRPC** is a minimal, TypeScript-first RPC framework inspired by tRPC. It allows you to define **typed procedures and routers** and call them in a type-safe way on both server and client.

---

## **Purpose**

TinyRPC is built to demonstrate:

* **Type-safe procedure definitions** with Zod validation.
* **Middleware support** for logging, auth, or transformations.
* **Server-client communication** via direct dispatch calls (no HTTP required in this demo).
* **In-memory example usage** for tasks, showing add/list/mark-done operations.

It’s perfect for learning **how RPC works internally** in a lightweight and understandable way.

---

## **Folder Structure**

```
tinyRPC/
├── src/
│   ├── index.ts            # Exports all core functionality
│   ├── core/
│   │   ├── types.ts        # Core types (ProcedureDef, RouterDef, MiddlewareFn)
│   │   ├── procedure.ts    # createProcedure
│   │   ├── router.ts       # createRouter, mergeRouters
│   │   ├── dispatch.ts     # callProcedure
│   │   ├── middleware.ts   # runMiddlewareChain
│   │   └── inference.ts    # infer inputs & outputs
└── examples/
    ├── server.ts           # Demo server (tasks)
    └── client.ts           # Demo client (calls procedures)
```

---

## **Getting Started**

1. **Install dependencies**

```bash
npm install
```

2. **Build the project**

```bash
npm run build
```

3. **Run the server demo**

```bash
npm start
# OR for development
npm run dev:server
```

You’ll see output like:

```
Server demo starting...
Server: task added { id: 1, title: 'Demo Task 1', done: false }
Server: task added { id: 2, title: 'Demo Task 2', done: false }
Server demo tasks: [ ... ]
```

4. **Run the client demo**

```bash
npm run client
# OR for development
npm run dev:client
```

It calls procedures on the server-side router and prints results:

```
Client added: { id: 3, title: 'Finish tinyRPC refactor', done: false }
Client sees tasks: [ ... ]
```

---

## **How it Works**

* **Procedures**: Typed functions validated with Zod.
* **Router**: Combines multiple procedures.
* **Dispatch**: Executes procedures with context & input.
* **Middleware**: Wraps procedures for logging, auth, transformations.
* **In-memory demo**: Task management (add, list, mark done).

---

## **Example Usage**

```ts
import { appRouter } from './server.js';
import { dispatch } from '../src/core/dispatch.js';

async function main() {
  const newTask = await dispatch(appRouter.addTask, {}, { title: 'Write README' });
  console.log('Client added:', newTask);

  const tasks = await dispatch(appRouter.listTasks, {}, {});
  console.log('Client sees tasks:', tasks);
}

main();
```

---

## **Purpose**

TinyRPC demonstrates **the internal workings of a minimal RPC system**, type-safe procedure calls, and middleware handling, making it perfect for **learning and experimentation**.

---
