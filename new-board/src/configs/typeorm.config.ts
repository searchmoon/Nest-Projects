import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Boards } from 'src/boards/boards.entity';
import { Users } from 'src/users/users.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'new-board',
  entities: [Users, Boards],
  synchronize: true,
};
