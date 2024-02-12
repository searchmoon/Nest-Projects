import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dtos/create-boards.dto';
import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { BoardStatus } from './boards-status.enum';
import { Boards } from './boards.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Boards[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() body: CreateBoardDto, @GetUser() user: Users) {
    return this.boardsService.createBoard(body, user);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: number) {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: BoardStatus,
  ): Promise<Boards> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
