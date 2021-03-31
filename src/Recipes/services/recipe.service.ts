import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from '../entities/recipe.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Recipe } from '../models/recipe.models';
import { Logger } from '@nestjs/common';

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

  async getRecipeByParams(value?: string): Promise<any> {
    // if(value) {
    //   return this.repo.find();}
    // else {
      let x = await this.repo.createQueryBuilder('recipe')
      .innerJoin('recipe.recipeIngredient', 'recipeIngredient')
      .innerJoin('recipeIngredient.ingredient', 'ingredient');
      if(value)
        // const filter = value.split(',');
        // x = x.where( 'ingredient.name = :name', {name: filter[0]});
        x = x.where( 'ingredient.name = :name', {name: value});

      return x.select(['recipe']).getMany();


    // .where( 'recipeIngredient.id' == 'recipe.recipeIngredientId')

    // const x = await this.repo.find({
    //   join: {
    //     alias: 'recipe',
    //     innerJoin: {
    //       recipeIngredient: 'recipe.recipeIngredient',
    //       ingredient: 'recipeIngredient.ingredient',
    //     },
    //     innerJoinAndSelect
    //   },
    //   where: { ingredient.name: filter[0] },
    // });
    
    // const x = this.repo.find({ where: { nume: value } });
    // return x;
    //http://localhost:3000/recipes?ingredients=rice,pui
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
