import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from './src/entities/Users';
import { Rooms } from './src/entities/Rooms';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Rooms],
  // migrations: [__dirname + '/src/migrations/*.ts'],
  synchronize: true,
  logging: true,
});

export default dataSource;
