import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DmsService } from './dms.service';

@Controller('dms')
export class DmsController {
  constructor(private dmsService: DmsService) {}

  @Get(':id/chats')
  getChat(@Param('id') id: string) {
    return this.dmsService.getChat(id);
  }

  @Post(':id/chats')
  postChat() {
    return this.dmsService.postChat();
  }
}
