import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
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
@Controller('recipes') //la plural fara list
export class RecipeController {
  constructor(public recipeService: RecipeService) {}

  @Get()
  getALL(@Param('ingredients') ingredients: string) {
    if (ingredients) {
      return this.recipeService.getRecipeByParams(ingredients).catch((a) => {
        return a;
      });
    } else {
      return this.recipeService.getALLReacipes().catch((a) => {
        return a;
      });
    }
  }

  // @Get('/name/:name')
  // getByName(@Param('name') name: string) {
  //   return this.recipeService.getRecipeByName(name).catch((a) => {
  //     return a;
  //   });
  // }

  // @Get('/search?ingredients=:id')
  // @Get() //in engleza
  // getByIngredients(@Param('name') name: string) {
  //   return this.recipeService.getRecipeByParams(name).catch((a) => {
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
  post(@Body(new ValidationPipe()) recipe: RecipeEntity) {
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
