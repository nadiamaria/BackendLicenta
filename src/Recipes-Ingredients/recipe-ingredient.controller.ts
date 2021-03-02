// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { Crud } from '@nestjsx/crud/lib/decorators/crud.decorator';

import { RecipeIngredientEntity } from './entities/recipe-ingredient.entity';
import { RecipeIngredient } from './models/recipe-ingredient.models';
import { RecipeIngredientService } from './services/recipe-ingredient.service';

@Crud({
  model: {
    type: RecipeIngredientEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('recipeingredient')
export class RecipeIngredientController {
  constructor(public recipeingredientService: RecipeIngredientService) {}

  @Get()
  getALL() {
    return this.recipeingredientService.getALLReacipes().catch((a) => {
      return a;
    });
  }

  // @Get('/name/:name')
  // getByName(@Param('name') name: string) {
  //   return this.recipeService.getRecipeByName(name).catch((a) => {
  //     return a;
  //   });
  // }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.recipeingredientService.getRecipeByID(id).catch((a) => {
      return a;
    });
  }

  @Post()
  post(@Body(new ValidationPipe()) recipe: RecipeIngredient) {
    return this.recipeingredientService.postRecipe(recipe);
  }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) recipe: RecipeIngredient,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.recipeingredientService.editRecipe(id, recipe);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.recipeingredientService.removeRecipe(id);
  }
}
