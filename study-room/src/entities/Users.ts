import { IsEmail, IsString } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  nickname: string;

  @IsEmail()
  @Column()
  email: string;

  @IsString()
  @Column()
  password: string;
}
