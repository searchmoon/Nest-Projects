import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
