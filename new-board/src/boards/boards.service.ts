import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boards } from './boards.entity';
import { CreateBoardDto } from './dtos/create-boards.dto';
import { BoardStatus } from './boards-status.enum';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards) private boardsRepository: Repository<Boards>,
  ) {}

  getAllBoards() {
    return this.boardsRepository.find();
  }

  getBoardById(id: number) {
    return this.boardsRepository.findOne({ where: { id: id } });
  }

  createBoard(boardDto: CreateBoardDto) {
    const board = this.boardsRepository.create(boardDto);
    board.status = BoardStatus.PUBLIC;

    return this.boardsRepository.save(board);
  }

  async deleteBoard(id: number) {
    const result = await this.boardsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can’t find Board with id ${id}`);
    }
  }
}
