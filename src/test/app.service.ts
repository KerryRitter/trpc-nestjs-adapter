import { Injectable } from '@nestjs/common';
// eslint-disable-next-line import/no-relative-packages
import { z } from '../../node_modules/zod';
import { TRPCInput, TRPCQuery } from '../lib/decorators';

const somethingInput = z.object({ name: z.string().optional() });

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this
  @TRPCQuery('something')
  doesSomething(@TRPCInput(somethingInput) input: typeof somethingInput._type) {
    return {
      name: input.name,
      done: true,
    };
  }
}
