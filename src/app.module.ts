import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteModule } from './Favorites/favorite.module';

import { IngredientModule } from './Ingredients/ingredient.module';
import { IngredientsCategoryModule } from './IngredientsCategory/ingredients-category.module';
import { RecipeModule } from './Recipes/recipe.module';
import { RecipeIngredientModule } from './RecipesIngredients/recipe-ingredient.module';
import { UserModule } from './Users/user.module';

@Module({
  imports: [
    RecipeModule,
    IngredientModule,
    RecipeIngredientModule,
    IngredientsCategoryModule,
    UserModule,
    FavoriteModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
