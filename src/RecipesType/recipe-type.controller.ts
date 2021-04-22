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

import { RecipeTypeEntity } from './entities/recipe-type.entity';
import { RecipeTypeService } from './services/recipe-type.service';

@Crud({
  model: {
    type: RecipeTypeEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('recipeTypes')
export class RecipeTypeController {
  constructor(public recipeTypeService: RecipeTypeService) {}

  @Get()
  getALL() {
    return this.recipeTypeService.getALLRecipeTypes().catch((a) => {
      return a;
    });
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.recipeTypeService.getRecipeTypeByID(id).catch((a) => {
      return a;
    });
  }

  @Post()
  post(@Body(new ValidationPipe()) recipeType: RecipeTypeEntity) {
    return this.recipeTypeService.postRecipeType(recipeType);
  }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) recipeType: RecipeTypeEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.recipeTypeService.editRecipeType(id, recipeType);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.recipeTypeService.removeRecipeType(id);
  }
}
