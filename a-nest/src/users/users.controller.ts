import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JoinRequestDto } from './dto/join.request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async join(@Body() body: JoinRequestDto) {
    await this.usersService.join(body.email, body.nickname, body.password);
  }

  @Get('logout')
  logout() {}
}
