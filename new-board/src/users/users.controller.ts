import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserAuthDto } from './dtos/user-auth.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) body: UserAuthDto) {
    return this.usersService.signUp(body);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) body: UserAuthDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signIn(body);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: Users) {
    console.log('user', user);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@Req() req) {
  //   console.log('req', req.user);
  // }
}
