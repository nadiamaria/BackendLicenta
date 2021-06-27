import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { IngredientEntity } from '../entities/ingredient.entity';

@Injectable()
export class IngredientService extends TypeOrmCrudService<IngredientEntity> {
  constructor(@InjectRepository(IngredientEntity) repo) {
    super(repo);
  }

  getALLIngredients(): Promise<any> {
    // return this.repo.find();
    const query = this.repo
      .createQueryBuilder('ingredients')
      .orderBy('ingredients.name');
    return query.select(['ingredients']).getMany();
    // return this.repo.find();
  }

  getALLIngredientswithoutOrder(): Promise<any> {
    // return this.repo.find();
    const query = this.repo.createQueryBuilder('ingredients');
    return query.select(['ingredients']).getMany();
  }

  getIngredientByID(id: number): Promise<any> {
    const query = this.repo
    .createQueryBuilder('ingredients')
    .andWhere('ingredients.recipeIngredient = :id', {
      id: id,
    });
    return query.select(['ingredients']).getMany();

    // const x = this.repo.findOne({ id: id });
    // return x;
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

  // async getIngredientCategory(id: number): Promise<any> {
  //   const ingredient: IngredientEntity = await this.repo.findOne({
  //     where: { id: id },
  //     relations: ['ingredientsCategory'],
  //   });
  //   return ingredient.ingredientsCategory;
  // }
}
