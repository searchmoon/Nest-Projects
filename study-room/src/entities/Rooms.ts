import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  // @IsString()
  @Column()
  room_type: 'BIG' | 'MEDIUM';

  @IsNumber()
  @Column()
  room_num: number;

  @IsNumber()
  @Column()
  capacity: number;

  @IsString()
  @Column()
  description: string;

  @IsNumber()
  @Column()
  price: number;

  @IsBoolean()
  @Column()
  available: boolean;
}
