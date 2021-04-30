// eslint-disable-next-line prettier/prettier
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
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
@Controller('recipesIngredients')
export class RecipeIngredientController {
  constructor(public recipeingredientService: RecipeIngredientService) {}

  @Get()
  getALL() {
    return this.recipeingredientService
      .getALLReacipesIngredients()
      .catch((a) => {
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
    return this.recipeingredientService.getRecipeIngredients(id).catch((a) => {
      return a;
    });
  }

  @Get('recipe/:id')
  getByRecipeId(@Param('id', ParseIntPipe) id: number) {
    return this.recipeingredientService.getRecipeIngredients(id).catch((a) => {
      return a;
    });
  }

  @Post()
  post(@Body(new ValidationPipe()) recipeIngredient: RecipeIngredientEntity) {
    return this.recipeingredientService.postRecipeIngredient(recipeIngredient);
  }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) recipeIngredient: RecipeIngredientEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.recipeingredientService.editRecipeIngredient(id, recipeIngredient);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.recipeingredientService.removeRecipeIngredient(id);
  }
}
