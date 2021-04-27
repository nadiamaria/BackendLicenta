// eslint-disable-next-line prettier/prettier
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud/lib/decorators/crud.decorator';

import { FavoriteEntity } from './entities/favorite.entity';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { FavoriteService } from './services/favorite.service';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import favoriteWithoutUserDto from './dto/favoriteWithoutUserDto';
import createFavoriteDto from './dto/createFavoriteDto';

@Crud({
  model: {
    type: FavoriteEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('favorites')
export class FavoriteController {
  constructor(public favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getALL() {
    return this.favoriteService.getALLFavorite().catch((a) => {
      return a;
    });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  getById(
    @Req() request: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.favoriteService
      .getFavoriteByID(request.user.id, id)
      .catch((a) => {
        return a;
      });
  }

  // @UseGuards(JwtAuthenticationGuard)
  // @Get('what')
  // getUserFavorite(
  //   @Req() request: RequestWithUser, //take token from cookie//
  //   @Query('recipe') recipe: number, //recipeID
  // ) {
  //   Logger.log('what');
  //   Logger.log(request);
  //   const user = request.user;
  //   user.password = undefined;
  //   return this.favoriteService
  //     .getFavoriteByParams(user.id, recipe)
  //     .then((a) => {
  //       return a;
  //     });
  // }

  //post favorite per user from cookie
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  post(
    @Req() request: RequestWithUser,
    @Body(new ValidationPipe()) favorite: favoriteWithoutUserDto,
  ) {
    const user = request.user;
    user.password = undefined;
    const modifFavorite: createFavoriteDto = {
      id: favorite.id,
      name: favorite.name,
      recipeId: favorite.recipeId,
      userId: user.id,
    };
    return this.favoriteService.postFavorite(modifFavorite);
  }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) favorite: FavoriteEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.favoriteService.editFavorite(id, favorite);
  }

  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   this.favoriteService.removeFavorite(id);
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  deleteByParams(
    @Req() request: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.favoriteService.removeFavoritebyParams(request.user.id, id);
  }

  // @Get('/:id/ingredientsCategoryList')
  // async getCategory(@Param('id', ParseIntPipe) id: number) {
  //   return this.ingredientService.getIngredientCategory(id);
  // }
}
