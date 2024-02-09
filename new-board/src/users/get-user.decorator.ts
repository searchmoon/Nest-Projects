import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Users } from './users.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

// user 정보를 받아오는 커스텀 데코레이터.
