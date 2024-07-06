import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ONLY_TEACHERS_KEY } from 'src/shared/decorators/only-teachers.decorator';
import { TokenPayload } from 'src/shared/types';

@Injectable()
export class OnlyTeachersGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const onlyTeachers = this.reflector.getAllAndOverride<boolean>(ONLY_TEACHERS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!onlyTeachers) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as TokenPayload;

    return user.type === 'teacher';
  }
}
