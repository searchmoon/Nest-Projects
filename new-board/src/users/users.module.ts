import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultstrategy: 'jwt' }),
    JwtModule.register({
      secret: 'room2',
      signOptions: {
        expiresIn: 60 * 60, // 한시간 이라는 뜻 (60초 * 60)
      },
    }),
    ,
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
