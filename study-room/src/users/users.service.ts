import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) usersRepository: Repository<Users>) {}

  async join(nickname: string, email: string, password: string) {
    const user = await this.usersRepository.create({
      nickname,
      email,
      password,
    });

    return this.usersRepository.save(user);
  }
}
