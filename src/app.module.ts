import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientModule } from './Ingredients/ingredient.module';
import { RecipeIngredient } from './Recipes-Ingredients/models/recipe-ingredient.models';
import { RecipeModule } from './Recipes/recipe.module';

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
