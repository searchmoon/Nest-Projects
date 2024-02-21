import { IsEmail, IsString } from 'class-validator';
import { Entity, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class CreateUserDto {
  @IsString()
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
