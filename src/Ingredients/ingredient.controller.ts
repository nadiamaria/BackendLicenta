// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { Crud } from '@nestjsx/crud/lib/decorators/crud.decorator';

import { IngredientEntity } from './entities/ingredient.entity';
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
    return this.ingredientService.getALLIngredients().catch((a) => {
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
    return this.ingredientService.getIngredientByID(id).catch((a) => {
      return a;
    });
  }

  @Post()
  post(@Body(new ValidationPipe()) ingredient: IngredientEntity) {
    return this.ingredientService.postIngredient(ingredient);
  }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) ingredient: IngredientEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.ingredientService.editIngredient(id, ingredient);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.ingredientService.removeIngerdient(id);
  }

  @Get('/:id/ingredientsCategoryList')
  async getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.getIngredientCategory(id);
  }
}
