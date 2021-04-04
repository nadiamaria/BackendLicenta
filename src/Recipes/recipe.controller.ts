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
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud/lib/decorators/crud.decorator';
import { RecipeEntity } from './entities/recipe.entity';
import { Recipe } from './models/recipe.models';
import { RecipeService } from './services/recipe.service';
import { Logger } from '@nestjs/common';

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
  getALL(@Query('ingredients') ingredients: string, @Query('category') category: string ) {
    // ingredients = 'orez,rice';
    // Logger.log(ingredients);

    // if (ingredients) {
    Logger.log('eu');

    return this.recipeService.getRecipeByParams(ingredients, category).then((a) => {
      Logger.log(category);
      return a;
    });
    // } else {
    // Logger.log('tu');

    //   return this.recipeService.getALLReacipes().catch((a) => {
    //     return a;
    //   });
    // }
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
