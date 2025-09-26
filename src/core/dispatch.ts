import { runMiddlewareChain, type MiddlewareFn } from './middleware.js';
import type { Procedure } from './router.js';

export async function dispatch<Input, Output>(
  proc: Procedure<Input, Output>,
  ctx: any,
  input: Input
): Promise<Output> {
  // Wrap the procedure's resolver to match runMiddlewareChain signature
  const resolver = async ({ ctx, input }: { ctx: any; input: Input }) => {
    return proc.resolver({ ctx, input }); // input guaranteed
  };

  const middleware: MiddlewareFn<any, Input, Output>[] = proc.middleware ?? [];

  return runMiddlewareChain(middleware, ctx, input, resolver);
}

// Optional helper
export async function callProcedure(
  router: Record<string, Procedure<any, any>>,
  path: string[],
  ctx: any,
  input: any
) {
  let current: any = router;
  for (const segment of path) {
    if (!current[segment]) throw new Error(`Procedure ${segment} not found`);
    current = current[segment];
  }
  return dispatch(current, ctx, input);
}
