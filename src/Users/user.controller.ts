import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud/lib/decorators/crud.decorator';
import { UserEntity } from './entities/user.entity';
import { User } from './models/user.models';
import { UserService } from './services/user.service';

@Crud({
  model: {
    type: UserEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('users')
export class UserController {
  newusers: string[] = [];
  constructor(public userService: UserService) {}

  // @Post()
  // post(@Body(new ValidationPipe()) user: UserEntity) {
  //   // return this.userService.postUser(user);
  //   this.create(user);
  // }

  // @Post()
  // post(@Body() user: UserEntity) {
  //   return this.userService.create(user);
  // }

  @Post()
  post(@Body(new ValidationPipe()) user: UserEntity) {
    //user.password =
    return this.userService.create(user);
  }

  @Get()
  getALL() {
    return this.userService.getALLUsers().catch((a) => {
      return a;
    });
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserByID(id).catch((a) => {
      return a;
    });
  }

  // @Post()
  // post(@Body(new ValidationPipe()) user: UserEntity) {
  //   return this.userService.postUser(user);
  // }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.userService.editUser(id, user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.userService.removeUser(id);
  }
  newUser: UserEntity;

  // @Post()
  // post(@Body(new ValidationPipe()) user: User) {
  //   // this.newUser.username = user.username;
  //   // this.newUser.password = user.password;
  //   // this.newUser.email = user.email;
  //   // return this.userService.postUser(this.newUser);
  //   return this.userService.postUser(user);
  // }

  //   @Get("user")
  //   async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
  //     const user = await this.userRepo.findOne({ where: { username } });

  //     if (!user) {
  //         throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
  //     }

  //     // compare passwords
  //     const areEqual = await comparePasswords(user.password, password);

  //     if (!areEqual) {
  //         throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //     }

  //     return toUserDto(user);
  // }
  // }
}
