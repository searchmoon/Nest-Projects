import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dtos/create-boards.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  createBoard(@Body() body: CreateBoardDto) {
    return this.boardsService.createBoard(body);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: number) {
    return this.boardsService.deleteBoard(id);
  }
}
