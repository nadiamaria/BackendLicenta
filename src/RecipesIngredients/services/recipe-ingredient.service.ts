import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { RecipeIngredientEntity } from '../entities/recipeIngredient.entity';
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

  getALLReacipesIngredients(): Promise<RecipeIngredient[]> {
    return this.repo.find();
  }

  getRecipeIngredientByID(id: number): Promise<RecipeIngredient> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  postRecipeIngredient(recipe: RecipeIngredient): Promise<RecipeIngredient> {
    return this.repo.save(recipe);
  }

  editRecipeIngredient(id: number, recipe: RecipeIngredient): void {
    this.repo.update(id, recipe);
  }

  async removeRecipeIngredient(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
