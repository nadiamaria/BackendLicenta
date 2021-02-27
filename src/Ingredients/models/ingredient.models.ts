import { IsNotEmpty, IsString } from 'class-validator';

export class Ingredient {
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  image: string;
}
