import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  //description: string;
  @IsString()
  // @IsNotEmpty()
  instruction: string;
  @IsString()
  //@IsNotEmpty()
  image: string;
}
