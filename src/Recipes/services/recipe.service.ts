import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from '../entities/recipe.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Recipe } from '../models/recipe.models';
import { Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { Recipe_ingredients } from '../models/recipe_ingredients.models';

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

  async getRecipeByParams(
    ingredients?: string,
    categorys?: string,
    types?: string,
  ): Promise<any> {
    let query = this.repo
      .createQueryBuilder('recipe')
      .innerJoin('recipe.recipeIngredient', 'recipeIngredient')
      .innerJoin('recipeIngredient.ingredient', 'ingredient');
    if (categorys) {
      query = query.innerJoin('recipe.recipeCategory', 'recipeCategory');
      query = query.andWhere('recipeCategory.category_name = :category_name', {
        category_name: categorys,
      });
    }
    if (types) {
      query = query.innerJoin('recipe.recipeType', 'recipeType');
      query = query.andWhere('recipeType.type_name = :type_name', {
        type_name: types,
      });
    }
    if (ingredients) {
      const filter = ingredients.split(',');
      query = query.andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('recipe_2.id')
          .from('recipe', 'recipe_2')
          .innerJoin('recipe_2.recipeIngredient', 'recipeIngredient_2')
          .innerJoin('recipeIngredient_2.ingredient', 'ingredient_2')
          .where(
            'ingredient_2.name IN (:...ingredients)',
            {
              ingredients: filter,
            },
          )
          .groupBy('recipe_2.id')
          .andHaving('COUNT(DISTINCT ingredient_2.name) = :filter_length', {
            filter_length: filter.length,
          })
          .getQuery();
        return 'recipe.id IN ' + subQuery;
      });
      return query.select(['recipe']).getMany();
      // const result = await query.select(['recipe', 'ingredient']).getRawMany();
      // return _(result)
      //   .groupBy('recipe_id')
      //   .map((value, key) => new Recipe_ingredients(key, value))
      //   .value();
    }

    return query.select(['recipe']).getMany();
    //http://localhost:3000/recipes?ingredients=rice,pui
  }

  async getRecipeByFavoritePerUser(user: number): Promise<any> {
    let query = this.repo
      .createQueryBuilder('recipe')
      .innerJoin('recipe.favorite', 'favorite')
      .innerJoin('favorite.user', 'user');
    query = query.andWhere('user.id = :user_id', { user_id: user });
    return query.select(['recipe']).getMany();
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
