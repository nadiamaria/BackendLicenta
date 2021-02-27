// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { Crud } from '@nestjsx/crud/lib/decorators/crud.decorator';

import { IngredientEntity } from './entities/ingredient.entity';
import { Ingredient } from './models/ingredient.models';
import { IngredientService } from './services/ingredient.service';

@Crud({
  model: {
    type: IngredientEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('ingredientList')
export class IngredientController {
  constructor(public ingredientService: IngredientService) {}

  @Get()
  getALL() {
    return this.ingredientService.getALLReacipes().catch((a) => {
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
    return this.ingredientService.getRecipeByID(id).catch((a) => {
      return a;
    });
  }

  @Post()
  post(@Body(new ValidationPipe()) ingredient: Ingredient) {
    return this.ingredientService.postRecipe(ingredient);
  }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) ingredient: Ingredient,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.ingredientService.editRecipe(id, ingredient);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.ingredientService.removeRecipe(id);
  }
}
