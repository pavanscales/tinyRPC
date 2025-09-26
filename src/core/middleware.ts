export type MiddlewareFn<Ctx = any, Input = any, Output = any> = (opts: {
  ctx: Ctx;
  input: Input;
  next: (newCtx?: Partial<Ctx>) => Promise<Output>;
}) => Promise<Output>;

export async function runMiddlewareChain<Ctx, Input, Output>(
  middleware: MiddlewareFn<Ctx, Input, Output>[],
  ctx: Ctx,
  input: Input,
  resolver: (opts: { ctx: Ctx; input: Input }) => Promise<Output>
): Promise<Output> {
  let index = -1;

  const runner = async (i: number, currentCtx?: Ctx): Promise<Output> => {
    if (i <= index) throw new Error('next() called multiple times');
    index = i;

    if (i === middleware.length) {
      return resolver({ ctx: currentCtx ?? ctx, input }); // ✅ input passed here
    }

    const mw = middleware[i];
    if (!mw) throw new Error('Middleware is undefined');

    return mw({
      ctx: currentCtx ?? ctx,
      input,
      next: (updatedCtx) =>
        runner(i + 1, { ...(currentCtx ?? ctx), ...updatedCtx }),
    });
  };

  return runner(0);
}
