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
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud/lib/decorators/crud.decorator';
import { RecipeEntity } from './entities/recipe.entity';
import { Recipe } from './models/recipe.models';
import { RecipeService } from './services/recipe.service';
import { Logger } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { request } from 'http';
import { Request, Response } from 'express';
import jwtDecode from 'jwt-decode';
import { TokenPayload } from 'src/authentication/tokenPayload.interface';

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

  public isTokenValid(string?: any): boolean {
    const objsect = jwtDecode((string || '') + '') as Partial<TokenPayload>;
    //verificat exprDate > < ca Date
    //exprDate sa fie formatat in tipul isoString
    //date type time? ISO 8601
    return true;
  }

  @Get()
  async getALL(
    @Query('ingredients') ingredients: string,
    @Query('category') category: string,
    @Req() request: Request,
    // @Res() response: Response,
  ) {
    //de dat refactor
    // if (this.isTokenValid(request.headers['authentication'])) {
    //   response.statusCode = 403;
    //   response.end();
    //   return;
    // }
    // this.isTokenValid(request.headers['authentication']);
    // Logger.log('retete');
    // Logger.log(request.headers['authentication']);
    // Logger.log(request.cookies);
    const recipes = await this.recipeService.getRecipeByParams(
      ingredients,
      category,
    );

    //id in request token
    //verif cu for each
    // console.log(recipes);
    return recipes;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('favorites')
  getALLFavorite(@Req() request: RequestWithUser) {
    return this.recipeService
      .getRecipeByFavoritePerUser(request.user.id)
      .then((a) => {
        return a;
      });
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
