import { sign } from 'jsonwebtoken';
import { secret, expiresIn } from 'src/config/auth.config';
import { RoleEnum } from '../models/enums/role.enum';
export function generateToken(data: any, roles: RoleEnum[]): string {
  const token = sign({ data, roles }, secret, { expiresIn });
  return token.toString();
}
