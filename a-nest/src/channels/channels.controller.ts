import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Channels')
@Controller('api/workspaces/:name/channels')
export class ChannelsController {
  @Get()
  getWorkspaceChannels() {}

  @Post()
  createWorkspaceChannels() {}

  @Get(':name')
  getWorkspaceChannel() {}

  @Get(':name/chats')
  getChat() {}

  @Post(':name/chats')
  createChat() {}

  @Get(':name/unreads')
  getUnreadChats() {}

  @Post(':name/images')
  saveImage() {}

  @Get(':name/members')
  getAllMembers() {}

  @Post(':name/members')
  inviteMembers() {}
}
