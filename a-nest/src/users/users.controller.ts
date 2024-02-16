import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { JoinRequestDto } from './dto/join.request.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  postUsers(@Body() body: JoinRequestDto) {
    return this.usersService.postUsers(body);
  }

  @Post('login')
  login() {}

  @Get('logout')
  logout() {}
}
