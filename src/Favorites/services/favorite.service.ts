import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { FavoriteEntity } from '../entities/favorite.entity';

@Injectable()
export class FavoriteService extends TypeOrmCrudService<FavoriteEntity> {
  constructor(@InjectRepository(FavoriteEntity) repo) {
    super(repo);
  }

  getALLFavorite(): Promise<any> {
    return this.repo.find();
  }

  getFavoriteByID(id: number): Promise<any> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  getFavoriteByParams(user: number, recipe: number) {
    const query = this.repo
      .createQueryBuilder('favorite')
      .andWhere('favorite.userId = :idUser', { idUser: user })
      .andWhere('favorite.recipeId = :idRecipe', { idRecipe: recipe });
    return query.select(['favorite']).getMany();
  }

  postFavorite(favorite: FavoriteEntity): Promise<any> {
    return this.repo.save(favorite);
  }

  editFavorite(id: number, favorite: FavoriteEntity): void {
    this.repo.update(id, favorite);
  }

  async removeFavorite(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async removeFavoritebyParams(user: number, recipe: number): Promise<void> {
    await this.repo.delete({ userId: user, recipeId: recipe });
  }

  // async getIngredientCategory(id: number): Promise<any> {
  //   const ingredient: IngredientEntity = await this.repo.findOne({
  //     where: { id: id },
  //     relations: ['ingredientsCategory'],
  //   });
  //   return ingredient.ingredientsCategory;
  // }
}
