import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('join')
  join(@Body() body: CreateUserDto) {
    return this.usersService.join(body.nickname, body.email, body.password);
  }

  // @Get()
  // getUsers() {
  //   return this.usersService.getUsers();
  // }

  // @Post('login')
  // login() {}

  // @Get('logout')
  // logout() {}
}
