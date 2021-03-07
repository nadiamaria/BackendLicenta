import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientModule } from './Ingredients/ingredient.module';
import { RecipeModule } from './Recipes/recipe.module';
import { RecipeIngredient } from './RecipesIngredients/models/recipe-ingredient.models';

@Module({
  imports: [
    RecipeModule,
    IngredientModule,
    RecipeIngredient,
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
