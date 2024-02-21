import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
