import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    if (!authToken) {
      return false;
    }

    return true;
  }
}
