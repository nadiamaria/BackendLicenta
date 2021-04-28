import { IsNotEmpty, IsString } from 'class-validator';
import { IngredientEntity } from 'src/Ingredients/entities/ingredient.entity';
import { Ingredient } from 'src/Ingredients/models/ingredient.models';

export class Recipe_ingredients {
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
  description: string;
  @IsString()
  //@IsNotEmpty()
  image: string;
  ingredients: Array<Ingredient>;

  public constructor(id: number, ingredient: any) {
    const recipe = ingredient[0];
    this.id = recipe.recipe_id;
    this.name = recipe.recipe_name;
    this.instruction = recipe.recipe_instruction;
    this.description = recipe.recipe_description;
    this.image = recipe.recipe_image;

    this.ingredients = ingredient.map(
      (i) =>
        new Ingredient(
          i.ingredient_id,
          i.ingredient_name,
          i.ingredient_ingredientCategorId,
        ),
    );
  }
}
