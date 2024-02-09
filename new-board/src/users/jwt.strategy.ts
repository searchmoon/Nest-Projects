import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {
    super({
      secretOrKey: 'room2',
      //AuthModule에서의 secret: 'room2'은 토큰을 생성하기 위해서 넣어준 것이고,
      //이부분은 토큰이 유효한지 체크할때 쓰는 것. 그래서, 똑같이 써줘야한다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    //이부분은 현재 요청의 Authorization 헤더에서
    //Bearer 토큰으로 전달된 JWT를 찾는 것을 의미
  }

  async validate(payload) {
    const { email } = payload;
    const user: Users = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
