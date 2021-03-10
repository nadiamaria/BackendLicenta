import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { IngredientsCategoryEntity } from '../entities/ingredients-category.entity';
import { IngredientsCategory } from '../models/ingredients-category.models';

@Injectable()
export class IngredientsCategoryService extends TypeOrmCrudService<
  IngredientsCategoryEntity
> {
  constructor(@InjectRepository(IngredientsCategoryEntity) repo) {
    super(repo);
  }

  getALLIngredientsCategorys(): Promise<IngredientsCategory[]> {
    return this.repo.find();
  }

  getIngredientsCategoryByID(id: number): Promise<IngredientsCategory> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  postIngredientsCategory(
    ingredientsCategory: IngredientsCategory,
  ): Promise<IngredientsCategory> {
    return this.repo.save(ingredientsCategory);
  }

  editIngredientsCategory(
    id: number,
    ingredientsCategory: IngredientsCategory,
  ): void {
    this.repo.update(id, ingredientsCategory);
  }

  async removeIngredientsCategory(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
