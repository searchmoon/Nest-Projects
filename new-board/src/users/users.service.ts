import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserAuthDto } from './dtos/user-auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async signUp(userInfo: UserAuthDto): Promise<void> {
    const { email, password } = userInfo;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('this email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(userInfo: UserAuthDto): Promise<{ accessToken: string }> {
    const { email, password } = userInfo;
    const user = await this.userRepository.findOne({ where: { email } });
    console.log('user', user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}

