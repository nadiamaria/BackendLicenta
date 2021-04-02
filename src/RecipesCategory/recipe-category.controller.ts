// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { Crud } from '@nestjsx/crud/lib/decorators/crud.decorator';

import { RecipeCategoryEntity } from './entities/recipe-category.entity';
import { RecipeCategoryService } from './services/recipe-category.service';

@Crud({
  model: {
    type: RecipeCategoryEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('recipeCategorys')
export class RecipeCategoryController {
  constructor(public recipeCategoryService: RecipeCategoryService) {}

  @Get()
  getALL() {
    return this.recipeCategoryService.getALLRecipeCategorys().catch((a) => {
      return a;
    });
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.recipeCategoryService.getRecipeCategoryByID(id).catch((a) => {
      return a;
    });
  }

  @Post()
  post(@Body(new ValidationPipe()) recipeCategory: RecipeCategoryEntity) {
    return this.recipeCategoryService.postRecipeCategory(recipeCategory);
  }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) recipeCategory: RecipeCategoryEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.recipeCategoryService.editRecipeCategory(id, recipeCategory);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.recipeCategoryService.removeRecipeCategory(id);
  }
}
