import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientModule } from './Ingredients/ingredient.module';
import { IngredientsCategoryModule } from './IngredientsCategory/ingredients-category.module';
import { RecipeModule } from './Recipes/recipe.module';
import { RecipeIngredientModule } from './RecipesIngredients/recipe-ingredient.module';

@Module({
  imports: [
    RecipeModule,
    IngredientModule,
    RecipeIngredientModule,
    IngredientsCategoryModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
