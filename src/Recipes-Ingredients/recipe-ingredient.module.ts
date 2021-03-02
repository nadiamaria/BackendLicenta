import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeIngredientEntity } from './entities/recipe-ingredient.entity';
import { RecipeIngredientController } from './recipe-ingredient.controller';
import { RecipeIngredientService } from './services/recipe-ingredient.service';


@Module({
  imports: [TypeOrmModule.forFeature([RecipeIngredientEntity])],
  controllers: [RecipeIngredientController],
  providers: [RecipeIngredientService],
})
export class RecipeModule {}
