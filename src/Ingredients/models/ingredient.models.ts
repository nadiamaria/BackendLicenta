import { IsNotEmpty, IsString } from 'class-validator';

export class Ingredient {
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  ingredientsCategoryId: number;

  public constructor(id: number, name: string, categoryId: number){ 
    this.id = id;
    this.name = name;
    this.ingredientsCategoryId = categoryId;
  }
}

