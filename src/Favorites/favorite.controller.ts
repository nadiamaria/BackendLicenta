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
  ValidationPipe,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud/lib/decorators/crud.decorator';

import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteService } from './services/favorite.service';

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

  // @Get()
  // getALL() {
  //   return this.favoriteService.getALLFavorite().catch((a) => {
  //     return a;
  //   });
  // }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.favoriteService.getFavoriteByID(id).catch((a) => {
      return a;
    });
  }

  @Get()
  getUserFavorite(
    @Query('user') user: number, //take token from cookie
    @Query('recipe') recipe: number,
  ) {
    return this.favoriteService.getFavoriteByParams(user, recipe).then((a) => {
      return a;
    });
  }

  @Post()
  post(@Body(new ValidationPipe()) favorite: FavoriteEntity) {
    return this.favoriteService.postFavorite(favorite);
  }

  @Put(':id')
  put(
    @Body(new ValidationPipe()) favorite: FavoriteEntity,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.favoriteService.editFavorite(id, favorite);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.favoriteService.removeFavorite(id);
  }

  @Delete()
  deleteByParams(@Query('user') user: number, @Query('recipe') recipe: number) {
    this.favoriteService.removeFavoritebyParams(user, recipe);
  }

  // @Get('/:id/ingredientsCategoryList')
  // async getCategory(@Param('id', ParseIntPipe) id: number) {
  //   return this.ingredientService.getIngredientCategory(id);
  // }
}
