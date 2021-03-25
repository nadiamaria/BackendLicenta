import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user.models';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }

  getALLUsers(): Promise<UserEntity[]> {
    return this.repo.find();
  }

  getUserByID(id: number): Promise<UserEntity> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  // async getUser(options?: any): Promise<User> {
  //   // const user = await this.repo.findOne(options);
  //   // return toUserDto(user);

  //   const myUser = await this.repo
  //     .createQueryBuilder('user')
  //     .where('user.username = :id OR user.password = :name', { id: 1, name: 'Timber' })
  //     .getOne();
  // }

  postUser(user: UserEntity): Promise<UserEntity> {
    return this.repo.save(user);
  }

  editUser(id: number, user: UserEntity): void {
    this.repo.update(id, user);
  }

  async removeUser(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async create(user: UserEntity): Promise<any> {
    return await this.repo.save(user);
  }
}

export const toUserDto = (data: UserEntity): User => {
  const { id, username, password } = data;
  const user: User = { id, username, password };
  return user;
};
