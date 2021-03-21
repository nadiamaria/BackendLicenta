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
@Controller('userList')
export class UserController {
  constructor(public userService: UserService) {}

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

  @Post()
  post(@Body(new ValidationPipe()) user: UserEntity) {
    return this.userService.postUser(user);
  }

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
}
