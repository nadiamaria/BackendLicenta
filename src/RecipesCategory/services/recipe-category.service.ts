import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { RecipeCategoryEntity } from '../entities/recipe-category.entity';

@Injectable()
export class RecipeCategoryService extends TypeOrmCrudService<
  RecipeCategoryEntity
> {
  constructor(@InjectRepository(RecipeCategoryEntity) repo) {
    super(repo);
  }

  getALLRecipeCategorys(): Promise<RecipeCategoryEntity[]> {
    return this.repo.find();
  }

  getRecipeCategoryByID(id: number): Promise<RecipeCategoryEntity> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  postRecipeCategory(
    recipeCategory: RecipeCategoryEntity,
  ): Promise<RecipeCategoryEntity> {
    return this.repo.save(recipeCategory);
  }

  editRecipeCategory(id: number, recipeCategory: RecipeCategoryEntity): void {
    this.repo.update(id, recipeCategory);
  }

  async removeRecipeCategory(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
