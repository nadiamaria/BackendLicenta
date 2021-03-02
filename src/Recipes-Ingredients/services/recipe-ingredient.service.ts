import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { RecipeIngredientEntity } from '../entities/recipe-ingredient.entity';
import { RecipeIngredient } from '../models/recipe-ingredient.models';

@Injectable()
export class RecipeIngredientService extends TypeOrmCrudService<
  RecipeIngredientEntity
> {
  // public findAll(): Observable<RecipeModel[]> {
  //   return of(MockedRecipes);
  // }
  constructor(@InjectRepository(RecipeIngredientEntity) repo) {
    super(repo);
  }

  getALLReacipes(): Promise<RecipeIngredient[]> {
    return this.repo.find();
  }

  getRecipeByID(id: number): Promise<RecipeIngredient> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  postRecipe(recipe: RecipeIngredient): Promise<RecipeIngredient> {
    return this.repo.save(recipe);
  }

  editRecipe(id: number, recipe: RecipeIngredient): void {
    this.repo.update(id, recipe);
  }

  async removeRecipe(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
