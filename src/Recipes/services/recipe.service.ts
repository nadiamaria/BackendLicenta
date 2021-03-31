import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from '../entities/recipe.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Recipe } from '../models/recipe.models';

@Injectable()
export class RecipeService extends TypeOrmCrudService<RecipeEntity> {
  // public findAll(): Observable<RecipeModel[]> {
  //   return of(MockedRecipes);
  // }
  constructor(@InjectRepository(RecipeEntity) repo) {
    super(repo);
  }

  getALLReacipes(): Promise<Recipe[]> {
    return this.repo.find();
  }

  getRecipeByID(id: number): Promise<Recipe> {
    const x = this.repo.findOne({ id: id });
    return x;
  }

  async getRecipeByParams(value: string): Promise<any> {
    const filter = value.split(', ');
    const x = await this.repo.find({
      join: {
        alias: 'recipe',
        innerJoin: {
          recipeIngredient: 'recipe.recipeIngredient',
        },
      },
      where: { name: filter[0], description: filter[1] },
    });
    return x;
    // const x = this.repo.find({ where: { nume: value } });
    // return x;
    //http://localhost:3000/recipes?ingredients=rice
  }

  postRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
    return this.repo.save(recipe);
  }

  editRecipe(id: number, recipe: Recipe): void {
    this.repo.update(id, recipe);
  }

  async removeRecipe(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
