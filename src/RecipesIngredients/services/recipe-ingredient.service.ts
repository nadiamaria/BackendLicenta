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

  getRecipeIngredients(recipe?: number): Promise<RecipeIngredientEntity[]> {
    const x = this.repo.find({ recipeId: recipe });
    return x;
  }

  getRecipeIngr() {
    const query = this.repo.createQueryBuilder('recipesIngredients');
    return query.select(['recipesIngredients']).getMany();
  }

  getALLReacipesIngredients(): Promise<RecipeIngredientEntity[]> {
    return this.repo.find();
  }

  getRecipeIngredientByID(id: number): Promise<RecipeIngredientEntity> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  postRecipeIngredient(
    recipeIngredient: RecipeIngredientEntity,
  ): Promise<RecipeIngredientEntity> {
    return this.repo.save(recipeIngredient);
  }

  editRecipeIngredient(
    id: number,
    recipeIngredient: RecipeIngredientEntity,
  ): void {
    this.repo.update(id, recipeIngredient);
  }

  async removeRecipeIngredient(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
