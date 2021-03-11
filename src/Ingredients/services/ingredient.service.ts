import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IngredientsCategoryEntity } from 'src/IngredientsCategory/entities/ingredients-category.entity';

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

  getALLIngredients(): Promise<any> {
    return this.repo.find();
  }

  getIngredientByID(id: number): Promise<any> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  postIngredient(ingredient: IngredientEntity): Promise<any> {
    return this.repo.save(ingredient);
  }

  editIngredient(id: number, ingredient: IngredientEntity): void {
    this.repo.update(id, ingredient);
  }

  async removeIngerdient(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async getIngredientCategory(id: number): Promise<any> {
    const ingredient: IngredientEntity = await this.repo.findOne({
      where: { id: id },
      relations: ['category'],
    });
    return ingredient.ingredientsCategory;
  }
}
