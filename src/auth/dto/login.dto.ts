import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  username: string;
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
