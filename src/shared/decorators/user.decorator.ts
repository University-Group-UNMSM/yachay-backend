import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../types';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as TokenPayload;
});

export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const user = request.user as TokenPayload;
  return user.sub;
});
