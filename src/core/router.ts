import { z, ZodType } from 'zod';
import type { MiddlewareFn } from './middleware.js';

// -------------------- Procedure --------------------
export type Procedure<Input = any, Output = any> = {
  resolver: (opts: { input: Input; ctx: any }) => Promise<Output>;
  inputSchema: ZodType<Input>;
  middleware?: MiddlewareFn<any, Input, Output>[];
};

// Create a procedure
export function procedure<Input, Output>(
  inputSchema: ZodType<Input>,
  resolver: (opts: { input: Input; ctx: any }) => Promise<Output>
): Procedure<Input, Output> {
  return {
    resolver,
    inputSchema,
    middleware: [],
  };
}

// -------------------- Router --------------------
// Strongly typed router factory
export function createRouter<T extends Record<string, Procedure<any, any>>>(router: T): T {
  return router;
}

// Optional: type alias for router
export type Router = Record<string, Procedure<any, any>>;
