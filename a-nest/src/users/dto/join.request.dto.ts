import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'rumi@gmail.com',
    description: '이메일',
  })
  public email: string;

  @ApiProperty({
    example: '루미',
    description: '닉네임',
  })
  public nickname: string;

  @ApiProperty({
    example: '비밀이야',
    description: '비밀번호',
  })
  public password: string;
}
