import { truncate } from 'fs';
import { IngredientsCategoryEntity } from 'src/IngredientsCategory/entities/ingredients-category.entity';
import { RecipeIngredientEntity } from 'src/RecipesIngredients/entities/recipe-ingredient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ingredient')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, unique: true, nullable: false })
  name: string;

  @OneToMany(
    () => RecipeIngredientEntity,
    (recipeIngredient) => recipeIngredient.ingredient,
  )
  recipeIngredient: RecipeIngredientEntity[];
  
}
