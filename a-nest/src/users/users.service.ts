import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  getUsers() {
    return;
  }

  async join(email: string, nickname: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!email) {
      throw new HttpException('이메일이 없네요', 400);
    }
    if (!nickname) {
      throw new HttpException('닉네임이 없네요', 400);
    }
    if (!password) {
      throw new HttpException('비밀번호기 없네요', 400);
    }
    if (user) {
      throw new HttpException('이미 존재하는 사용자입니다.', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
