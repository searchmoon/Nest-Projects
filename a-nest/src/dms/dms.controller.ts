import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DmsService } from './dms.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dms')
@Controller('dms')
export class DmsController {
  constructor(private dmsService: DmsService) {}

  @ApiOperation({ summary: '회원가입' })
  @Get(':id/chats')
  getChat(@Param('id') id: string) {
    return this.dmsService.getChat(id);
  }

  @Post(':id/chats')
  postChat() {
    return this.dmsService.postChat();
  }
}
