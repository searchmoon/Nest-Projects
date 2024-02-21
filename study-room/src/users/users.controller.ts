import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('join')
  join(@Body() userInfo: CreateUserDto): Promise<void> {
    return this.usersService.join(userInfo);
  }

  @Get()
  @UseGuards(AuthGuard())
  getUser(@Param(':id') email: string) {
    return this.usersService.getUser({ where: { email } });
  }

  @Post('login')
  login(@Body() userInfo: CreateUserDto): Promise<{ accessToken: string }> {
    return this.usersService.login(userInfo);
  }

  @Get('test')
  // @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('user', req.headers.authorization);
  }

  // @Get('logout')
  // logout() {}
}
