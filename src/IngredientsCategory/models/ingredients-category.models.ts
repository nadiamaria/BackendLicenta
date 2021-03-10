import { IsNotEmpty, IsString } from 'class-validator';

export class IngredientsCategory {
  id: number;
  @IsString()
  @IsNotEmpty()
  category_name: string;
}
