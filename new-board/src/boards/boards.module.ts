import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from './boards.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Boards]), UsersModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
