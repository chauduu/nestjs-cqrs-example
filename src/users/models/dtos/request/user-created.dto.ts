import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  ArrayUnique,
  ArrayMinSize,
  Length,
  Matches,
} from 'class-validator';
import { RoleEnum } from '../../enums/role.enum';
export class UserCreatedDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(4, 20, { message: 'Username must be between 4 and 20 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username must contain only letters and numbers',
  })
  username: string;
  @IsNotEmpty()
  @Length(6, 30, { message: 'Password must be between 6 and 30 characters' })
  password: string;
  @IsEnum(RoleEnum, { each: true })
  @ArrayUnique()
  @ArrayMinSize(1)
  roles: RoleEnum[];
}
