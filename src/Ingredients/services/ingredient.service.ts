import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { IngredientEntity } from '../entities/ingredient.entity';
import { Ingredient } from '../models/ingredient.models';

@Injectable()
export class IngredientService extends TypeOrmCrudService<IngredientEntity> {
  // public findAll(): Observable<RecipeModel[]> {
  //   return of(MockedRecipes);
  // }
  constructor(@InjectRepository(IngredientEntity) repo) {
    super(repo);
  }

  getALLIngredients(): Promise<Ingredient[]> {
    return this.repo.find();
  }

  getIngredientByID(id: number): Promise<Ingredient> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  postIngredient(recipe: Ingredient): Promise<Ingredient> {
    return this.repo.save(recipe);
  }

  editIngredient(id: number, recipe: Ingredient): void {
    this.repo.update(id, recipe);
  }

  async removeIngerdient(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
