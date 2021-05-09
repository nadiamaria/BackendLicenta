import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserEntity } from '../entities/user.entity';
import CreateUserDto from '../../authentication/dto/CreateUserDto';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }

  async getALLUsers(): Promise<UserEntity[]> {
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

  // create(user: UserEntity): Promise<any> {
  //   return this.repo.save(user);
  // }

  async getByEmail(email: string) {
    const user = await this.repo.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    if (!userData.role) userData.role = 'user';
    const newUser = await this.repo.create(userData);
    await this.repo.save(newUser);
    return newUser;
  }

  async getById(id: number) {
    const user = await this.repo.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
