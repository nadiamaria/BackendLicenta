// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { Crud } from '@nestjsx/crud/lib/decorators/crud.decorator';

import { IngredientsCategoryEntity } from './entities/ingredients-category.entity';
import { IngredientsCategory } from './models/ingredients-category.models';
import { IngredientsCategoryService } from './services/ingredients-category.service';

@Crud({
  model: {
    type: IngredientsCategoryEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('ingredientsCategorys')
export class IngredientsCategoryController {
  constructor(public ingredientsCategoryService: IngredientsCategoryService) {}

  @Get()
  getALL() {
    return this.ingredientsCategoryService
      .getALLIngredientsCategorys()
      .catch((a) => {
        return a;
      });
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientsCategoryService
      .getIngredientsCategoryByID(id)
      .catch((a) => {
        return a;
      });
  }

  @Post()
  post(@Body(new ValidationPipe()) ingrediensCategory: IngredientsCategory) {
    return this.ingredientsCategoryService.postIngredientsCategory(
      ingrediensCategory,
    );
  }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) ingredientsCategory: IngredientsCategory,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.ingredientsCategoryService.editIngredientsCategory(
      id,
      ingredientsCategory,
    );
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.ingredientsCategoryService.removeIngredientsCategory(id);
  }
}
