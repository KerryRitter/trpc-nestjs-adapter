import { initTRPC } from '@trpc/server';

const decoratorRoutes: Array<{ type: any, method: string, queryOrMutation: 'query' | 'mutation', route: string }> = [];

export const createDefaultTrpc = () => initTRPC.context().create({

});

export const createRouter = (createTrpc?: typeof createDefaultTrpc) => {
  const trpc = (createTrpc || createDefaultTrpc)();

  const { router } = trpc;
  const publicProcedure = trpc.procedure;

  const routerObj: any = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const route of decoratorRoutes) {
    routerObj[route.route] = publicProcedure[route.queryOrMutation](async ({ ctx }: any) => {
      const service = await ctx.resolveNestDependency(route.type);
      return service[route.method]();
    });
  }

  return router({
    ...routerObj,
  });
};

// eslint-disable-next-line arrow-body-style
export const TRPCQuery = (route: string) => {
  return (target: any, propertyKey: string) => {
    const type = target.constructor;
    decoratorRoutes.push({
      type,
      method: propertyKey,
      queryOrMutation: 'query',
      route,
    });
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TRPCInput = (type: any) => (target: any, key: any, index: any) => { };
