import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteModule } from './Favorites/favorite.module';

import { IngredientModule } from './Ingredients/ingredient.module';
import { IngredientsCategoryModule } from './IngredientsCategory/ingredients-category.module';
import { RecipeModule } from './Recipes/recipe.module';
import { RecipeCategoryModule } from './RecipesCategory/recipe-category.module';
import { RecipeIngredientModule } from './RecipesIngredients/recipe-ingredient.module';
import { UserModule } from './Users/user.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthenticationModule } from './authentication/authentication.module';
import { RecipeTypeModule } from './RecipesType/recipe-type.module';

@Module({
  imports: [
    RecipeModule,
    IngredientModule,
    RecipeIngredientModule,
    IngredientsCategoryModule,
    UserModule,
    FavoriteModule,
    RecipeCategoryModule,
    AuthenticationModule,
    RecipeTypeModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
