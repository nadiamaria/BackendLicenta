import { IsNotEmpty, IsString } from 'class-validator';

export class RecipeIngredient {
  id: number;
  @IsString()
  @IsNotEmpty()
  unit_mas: string;
  @IsString()
  @IsNotEmpty()
  cant_ingr: string;
}
