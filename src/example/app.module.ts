import { Module } from '@nestjs/common';
import { TrpcModule } from '../lib/trpc.module';
import { AModule } from './domain-b/a.module';

@Module({
  imports: [
    AModule,
    TrpcModule.forRoot({
      path: '/trpc',
      createContext: () => ({}),
    }),
  ],
})
export class AppModule { }
