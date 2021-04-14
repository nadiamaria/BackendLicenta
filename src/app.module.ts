import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { FavoriteModule } from './Favorites/favorite.module';

import { IngredientModule } from './Ingredients/ingredient.module';
import { IngredientsCategoryModule } from './IngredientsCategory/ingredients-category.module';
import { RecipeModule } from './Recipes/recipe.module';
import { RecipeCategoryModule } from './RecipesCategory/recipe-category.module';
import { RecipeIngredientModule } from './RecipesIngredients/recipe-ingredient.module';
import { UserModule } from './Users/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RecipeModule,
    IngredientModule,
    RecipeIngredientModule,
    IngredientsCategoryModule,
    UserModule,
    FavoriteModule,
    RecipeCategoryModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
    })})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
