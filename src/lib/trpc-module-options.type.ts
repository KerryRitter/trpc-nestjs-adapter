import { createDefaultTrpc } from './decorators';

export interface TrpcModuleOptions {
  factory?: typeof createDefaultTrpc;
  path: '/trpc' | string;
  createContext: () => any;
}
