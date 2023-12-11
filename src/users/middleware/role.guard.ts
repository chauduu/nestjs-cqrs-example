import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from '../models/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly requiredRoles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRoles: RoleEnum[] = request['roles'];

    if (!userRoles || !this.checkRoles(userRoles)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }

  private checkRoles(userRoles: RoleEnum[]): boolean {
    return userRoles.some((role) => this.requiredRoles.includes(role));
  }
}
