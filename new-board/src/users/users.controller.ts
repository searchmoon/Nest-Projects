import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserAuthDto } from './dtos/user-auth.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) body: UserAuthDto) {
    return this.usersService.signUp(body);
  }

  // @Post('/signin')
  // signIn(@Body(ValidationPipe) body: UserAuthDto) {
  //   return this.usersService.signIn(body);
  // }
}
