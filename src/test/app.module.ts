import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RequestScopedService } from './request-scoped.service';
import { TrpcModule } from '../lib/trpc.module';
import { AModule } from '../example/domain-b/a.module';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    RequestScopedService,
  ],
  imports: [
    AModule,
    TrpcModule.forRoot({
      path: '/trpc',
      createContext: () => {
        'randomValue';
      },
    }),
  ],
})
export class AppModule { }
