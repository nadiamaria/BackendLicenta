import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  role: string;
}
