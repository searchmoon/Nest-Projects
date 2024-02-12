import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './boards-status.enum';
import { Users } from 'src/users/users.entity';

@Entity()
export class Boards extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: BoardStatus;

  @ManyToOne(() => Users, (user) => user.boards, { eager: false })
  user: Users;
}
