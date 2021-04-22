import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { RecipeTypeEntity } from '../entities/recipe-type.entity';

@Injectable()
export class RecipeTypeService extends TypeOrmCrudService<RecipeTypeEntity> {
  constructor(@InjectRepository(RecipeTypeEntity) repo) {
    super(repo);
  }

  getALLRecipeTypes(): Promise<RecipeTypeEntity[]> {
    return this.repo.find();
  }

  getRecipeTypeByID(id: number): Promise<RecipeTypeEntity> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  postRecipeType(recipeType: RecipeTypeEntity): Promise<RecipeTypeEntity> {
    return this.repo.save(recipeType);
  }

  editRecipeType(id: number, recipeType: RecipeTypeEntity): void {
    this.repo.update(id, recipeType);
  }

  async removeRecipeType(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
