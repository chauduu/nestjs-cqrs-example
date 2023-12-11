import { RoleEnum } from 'src/users/models/enums/role.enum';

export class CreateUserCommand {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly roles: RoleEnum[],
  ) {}
}
