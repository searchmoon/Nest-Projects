import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boards } from './boards.entity';
import { CreateBoardDto } from './dtos/create-boards.dto';
import { BoardStatus } from './boards-status.enum';
import { Users } from 'src/users/users.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards) private boardsRepository: Repository<Boards>,
  ) {}

  getAllBoards(): Promise<Boards[]> {
    return this.boardsRepository.find();
  }

  async getBoardById(id: number) {
    const found = await this.boardsRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Boards> {
    const board = await this.getBoardById(id);

    board.status = status;
    return board;
  }

  createBoard(boardDto: CreateBoardDto, users: Users) {
    const board = this.boardsRepository.create(boardDto);
    board.status = BoardStatus.PUBLIC;
    board.users = users;

    return this.boardsRepository.save(board);
  }

  async deleteBoard(id: number) {
    const result = await this.boardsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can’t find Board with id ${id}`);
    }
  }
}
