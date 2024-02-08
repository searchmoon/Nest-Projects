import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BoardsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
