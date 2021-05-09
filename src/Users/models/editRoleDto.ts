import { IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  role: string;
}
