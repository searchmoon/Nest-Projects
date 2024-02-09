import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

export class UserAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // @Min(6)
  // @Max(12)
  @IsNotEmpty()
  password: string;
}
