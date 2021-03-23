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
