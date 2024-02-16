### chat api 요약정리

express.js와 nest.js의 차이점:

- nest의 기능들이 더 세분화 되어있음.(express 에서는 미들웨어가 exception filters, pipes, guards 의 역할을 모두 담당을 했는데, nest 에서는 exception filters, pipes, guards를 각각 쓴다.)

nest 공식문서 잘 이용하기!

nest.js 는 스웨거 제공해준다. 

시작하기 전에: node.js, MySQL 설치해준다. 

nest.js & express.js 비교 

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/724b0212-35f0-4449-8d9c-28494924711a/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/d79af9aa-db0d-446c-8121-4bbe95f0c4f8/Untitled.png)

express.js 프로젝트 인계받으면 제일 처음에 볼것은 package.json 살펴봐야함. 어떤 것을 쓰는지.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/373bdf9f-3960-4793-ab33-3a5f7a7c6498/Untitled.png)

express 프로젝트의 package.json 파일인데, sequelize는 nest.js에서는 TypeORM 으로 대체될거다.

https://github.com/ZeroCho/sleact/tree/master/nest-typeorm 깃헙 소스코드 보기. 

back 폴더는 express, sequelize 코드 들어있고,

nest-typeorm 폴더에 nest, typeorm 코드 들어있다.

nestjs admin 에서 간단한 admin 기능 쓸 수 있다

### 새 프로젝트 생성

- 폴더 만들어주고,

> npm i -g @nestjs/cli
> 

nest 프로젝트 시작할 폴더 하나 만들어주고, 그 안으로 들어가서, 

nest 프로젝트 생성:

> nest new aNest
> 

(여기서 aNest 는 그냥 안에다가 만들어줄 폴더 이름임)

Prettier 자동정렬 안돼서, cmd + , 누르고 셋팅 들어가서 Default Formatter : Prettier -Code formatter 로 바꿔주었다. (했는데도 안되면, format on save 설정확인. 체크 되어 있어야함)

### 핫 리로드 설정

> npm i --save-dev webpack-node-externals run-script-webpack-plugin webpack
> 

핫리로딩은 코드 변경 사항이 발생했을 때 애플리케이션을 다시 시작하지 않고도 해당 변경 사항을 즉시 반영하여 사용자에게 보여준다.

https://docs.nestjs.com/recipes/hot-reload

설치하고 나서,  webpack-hmr.config.js 설정 파일 추가. 위의 공식문서 참고.

package.json 들어가서

"start:dev": "nest start --watch", 복사해주고

```
"start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js",
"start:dev-backup": "nest start --watch",
```

한줄은 이렇게, 나머지한줄은 이렇게 바꿔준다.

이렇게 하고, npm run start:dev

### Controller

컨트롤러에 데코레이터를 통해 네스트가 코드를 알아서 찾아서 연결한다. 이런것을 제어의 역전(IoC:개발자가 작성한 객체나 메서드의 제어를 개발자가 아니라 외부에 위임하는 설계 원칙) 이라고함.

express 같은것은 명확하게 연결해주는 것이 보이는데 nest에서는 데코레이터 하나만 붙여주므로써 연결을 해준다.

다만 모듈을 직접 구성해야한다는 점에서 스프링보다 IoC 가 약하다.

- 환경설정을 해주기 위해서https://docs.nestjs.com/techniques/configuration 참고
npm i --save @nestjs/config 를 설치하고,

```tsx
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; //이부분 추가
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()], //이부분 추가
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

이렇게 하고, .env 파일 만들어서 설정해줄수 있다.

그리고, .env.production 또는 .env.development 라고 개발모드, 운영모드를 따로 설정할 수 있다. 

  imports: [ConfigModule.forRoot({isGlobal: true})],

해주고,

providers: [AppService, ConfigService],

추가해준다.

그러고나서, AppService에서 ConfigService를 주입해서 사용할 수 있다.

```tsx
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return this.configService.get('DB_PASSWORD');
  }
}
```

this.configService.get('DB_PASSWORD')는 process.env.DB_PASSWORD 랑 같은거다. 근데 configService를 쓰는것을 추천.

추천하는 이유는 저걸 외부에서 가져오는건데, 
configService로 해주면 이것마저 다 nest 에서 관리할 수 있기 때문에  

middleware 생성

```sql
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLegnth = response.get('content-length');
      this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLegnth} - ${userAgent} ${ip}`);
    });

    next();
  }
}
```

위의 코드에서

라우터가 시작할때 이코드가 먼저 실행되고,

```sql
const { ip, method, originalUrl } = request;
const userAgent = request.get('user-agent') || '';
```

라우터가 실행되고, 그 다음에

이 코드가 실행된다.(라우터가 끝날때)

```sql
response.on('finish', () => {
  const { statusCode } = response;
  const contentLegnth = response.get('content-length');
  this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLegnth} - ${userAgent} ${ip}`);
});
```

이 미들웨어는 HTTP 요청 및 응답에 대한 로깅을 처리한다.

```sql
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

이 AppModule 에서 **LoggerMiddleware**는 모든 경로(**'*'**)에 대해 적용됩니다. 이렇게 하면 애플리케이션의 모든 HTTP 요청에 대해 로깅이 수행됩니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/7e264b92-07fd-45bd-9c3a-44c88ffc6857/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/cdec3a29-2f62-46a8-aa1d-084928d6af90/Untitled.png)

Module에 넣어줄때 providers: 같은 경우에는 그냥 배열로 넣어주었다. providers:[AppService, UserService]   이런식으로. 근데 원래는 이 위의 형태를 간결하게 써준것이다. 그 아래의 custom_key 같은 경우는 그 옆에 사진인 controller에서도 보면, @Inject데코레이터를 따로 써줘야함.  (클래스가 아닌애들은 그렇다. 클래스인 service는 저 데코레이터를 쓰지않아도됨)

## API 설계하기

### 모듈, 컨트롤러 생성

> nest g module 폴더이름
> 

> nest g controller 폴더이름
> 

- nest 는 export 해줄때도 대부분 default를 쓰지않는다. 
export class UserDto{}
이런식으로 export 를 해주기 때문에 항상 중괄호로 import 해온다.{}
- 그리고,nest 는  interface 를 잘 쓰지 않고, class를 쓰는데, 그러는 이유는 interface 는 타입스크립트에서 자바스크립트로 컴파일이 되고 사라져버리는데, class는 계속 남아있다. 재사용성 증가에 도움됨. interface처럼 타입 역할도 해주고, 타입체크도 할 수 있기 때문에 nest 에서는 class 를 주로 써준다.

dms, workspaces, users, channels 의 폴더에 module, controller, service 를 각각 추가해주고, controller 에 api 설계 방식을 정의하였다.

### API 문서 만들기

공식문서 참고: https://docs.nestjs.com/openapi/introduction 

> npm install --save @nestjs/swagger
> 

swagger 설치해준다. 

공식문서 따라하기.

main.ts 에 

```tsx
const config = new DocumentBuilder()
  .setTitle('Chat Api')
  .setDescription('Chat 기능 개발을 위한 문서입니다.')
  .setVersion('1.0')
  .addCookieAuth(’connect.sid’)
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

이부분 추가하였다. SwaggerModule, DocumentBuilder 도 import 해주었다.

 .addTag('cats') 되어있던것만 .addCookieAuth(’connect.sid’) 라고 고쳐주었다.

이렇게하고 npm run start:dev 하면,

/api 주소에 api 문서를 만들어준다. controller에 정의한걸 이렇게 만들어줌.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/cc967fed-11ea-407a-90f6-f85b467d1678/Untitled.png)

controller 에서 각각의 라우트 핸들러 바로 위에 @ApiOperation({summary: ‘회원가입’}) 이런식으로 작성해주면, 옆에 추가 설명을 덧붙일 수 있다. 

swagger 공식문서에서 추가 기능 살펴보기. 

usersController 에 가보면,JoinRequestDto 가 있는데,

Dto 에 대한 타입같은건 나와있지 않다. 그래서 직접 넣어줘야하는데,

```tsx
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
```

이런식으로 @ApiProperty() 데코레이터를 넣어주면, swagger 문서에도 잘 나온다.

저 문서에서 try it out, execute 해서 실행해볼수 있다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/faeb72ec-d466-4860-a470-07f070beae00/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b08e7419-4fd5-4a8b-9478-184d8f32f525/f5128914-b3c5-40fe-ae04-51afd4d47814/Untitled.png)

직접 추가해줘야 하는 부분 많음. query, param 부분도 @ApiQuery(), @ApiParam() 으로 직접 설정해줘야함. dms.controller에서 필요하다. 공식문서 참고

controller 들에 @ApiTags()로 그룹별로 묶어주었다.

- Dto를 만들어두면 좋은게, nest 에서는 dto에서 body 가 들어올때 body parser가 동작하는 동시에 validation 까지 같이 할수 있어서 좋다.(보통 class-validator 라이브러리를 갖다 붙여서 쓴다.) 공통으로 자주쓰이는 dto는common 폴더에 빼놓고 쓰자.

userDto를 common 에 만들어주었다. 

JoinRequestDto를 extends 받아서 userDto 에서 사용하게 만들었다. (클래스의 장점: 확장 용이)

@ApiResponse() 를 사용해서 @ApiResponse({type: UserDto})

이런식으로 response type 이 UserDto 인것을 넣어줄수도있다. usersController에 사용. 성공시 이런 데이터가 나오는것을 편리하게 볼수 있게 해준다. 

### 커스텀 데코레이터 만들기

데코레이터 중 @Req(), @Res() 는 웬만하면 많이 안쓰는것이 좋다. req, res 는 특정한 어떤것에 종속되어서 나중에 바꾸기도 어려워지고, 테스트 하기도 어렵다.  그래서 커스텀 데코레이터를 만들어서 res, req 를 안쓰게 만들어주겠다.

```tsx
//user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

이 데코레이터로 request.user 를 그대로 가져올수 있다.

users.controller.ts에서

```jsx
@Get()
getusers(@Req() req) {
	return req.user;
}

// 이 코드를 이렇게 바꿔준다.
@Get()
getusers(@User() user) {
	return user;
}
```

token 데코레이터 생성.

```jsx
//token.decorator.ts
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    return response.locals.jwt;
  },
);

// HTTP 요청에 포함된 토큰 정보를 추출하는 기능
```

데코레이터를 안쓰고 그냥 내장 데코레이터로 사용할거면 이렇게도 가능하긴 하다. 

```jsx
@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService) {}
		
	@Get('/user')
	@UseGuards(AuthGuard())
	async findUser(@Req() req) {
	  const jwtToken = req.headers.authorization;
	  // 이후에 token을 사용하여 사용자 정보를 조회하거나, 인증을 처리합니다.
	}
}
```

### 인터셉터 사용하기

- 인터셉터는 HTTP 요청의 전처리 또는 후처리 작업을 수행하여 응답을 가로채고 수정할 수 있다. 예를 들어, 요청 데이터를 검증하거나, 응답 데이터를 가공하여 클라이언트에게 제공할 수 있다.
- 인터셉터를 이용하여 AOP(Aspect Oriented Programming)는 관점 지향 프로그래밍이라고 한다. 목적은 모듈성을 높이는것. AOP에서의 관점은 흩어진 관심사를 응집시키는 것을 말한다.
- 이럴때 쓴다! 
- 만약 특정 클래스들에서 공통적으로 사용하는 기능이 있다면? 
- 심지어 비즈니스 로직과 관련이 없거나 부가적인 기능이라면?
- 쉽게 설명을 하자면, 4개의 기능이 있는데,
a - b - c - d
a - e - d
a - g - h - d
a - i - d - g
이렇게 4가지의 기능이있다고 하면, 공통적인 관심사가 앞에 a인것 이 모두 똑같고, 뒤쪽에 d가 있는 것이 똑같다. 그러면 미들웨어를 이용하면 a 기능에 하나, d 기능에 하나 해서 두개의 미들웨어를 사용할것이다. 근데 그것을 a(전), d(후) 처리를 하게 해주는 인터셉터 하나로 만들어 처리를 해줄수 있다 이거다.
여러가지 서비스 또는 공통 요청, 응답이 잇으면 거기서 공통되는 부분만 추려가지고 인터셉터를 써주면 된다. (근데, 인터셉터라고 해서 전, 후가 꼭 공통되는것이 있어야 되는것은 아님. 후 부분만 같아도 인터셉터의 전 부분을 비워주고 사용가능. 이 바로 뒤의 인터셉터 코드가 그렇다.
- 순서: Client Requert -> Pre Interceptor -> Controller Handler -> Service -> ... -> Controller Handler -> Post Interceptor ( 컨트롤러를 두고 전 후로 수행이된다)

```jsx
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 전 부분 (컨트롤러 전)
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
    //.pipe() 부분이 컨트롤러 후 부분
  }
}
```

여기서 인터셉터는 마지막에 데이터를 한번 더 가공해주는 역할로 쓴다. 이 코드에서는 전 부분은 작성해주지 않았다. 전부분은 로그를 띄워준다거나 그런 기능을 하는데도 사용한다.

이 인터셉터를 쓰려면, 다른 컨트롤러에서 각각의 라우트핸들러에 적용해주어도 되고, 컨트롤러의 최상단(@Controller() 부분. 여기에 작성하면 이 컨트롤러 내의 모든 라우트핸들러에 다 적용한다는 뜻) 위에 작성해주어도 되는데,

@UseInterceptors(UndefinedToNullInterceptor)

이렇게 작성해주면 된다. 

.pipe(map((data) => (data === undefined ? null : data)));

이부분을 보면 알겠지만 이 인터셉터를 적용해준것은 return 값이 undefined 로 나오는 값은 모두 null 로 return 해준다. 
