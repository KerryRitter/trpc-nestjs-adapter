import { Injectable } from '@nestjs/common';
import { TRPCQuery } from '../../lib/decorators';

@Injectable()
export class AService {
  @TRPCQuery('something')
  smth() {
    return {
      a: true,
    };
  }
}
