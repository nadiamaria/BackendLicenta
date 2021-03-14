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
import { RecipeEntity } from './entities/recipe.entity';
import { Recipe } from './models/recipe.models';
import { RecipeService } from './services/recipe.service';

@Crud({
  model: {
    type: RecipeEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('recipeList')
export class RecipeController {
  constructor(public recipeService: RecipeService) {}

  @Get()
  getALL() {
    return this.recipeService.getALLReacipes().catch((a) => {
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
    return this.recipeService.getRecipeByID(id).catch((a) => {
      return a;
    });
  }

  @Post()
  post(@Body(new ValidationPipe()) recipe: Recipe) {
    return this.recipeService.postRecipe(recipe);
  }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) recipe: Recipe,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.recipeService.editRecipe(id, recipe);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.recipeService.removeRecipe(id);
  }
}
