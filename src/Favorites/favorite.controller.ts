// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
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

  @Get()
  getALL() {
    return this.favoriteService.getALLFavorite().catch((a) => {
      return a;
    });
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.favoriteService.getFavoriteByID(id).catch((a) => {
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

  // @Get('/:id/ingredientsCategoryList')
  // async getCategory(@Param('id', ParseIntPipe) id: number) {
  //   return this.ingredientService.getIngredientCategory(id);
  // }
}
