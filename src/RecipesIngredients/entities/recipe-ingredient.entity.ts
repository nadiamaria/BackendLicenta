import { IngredientEntity } from 'src/Ingredients/entities/ingredient.entity';
import { RecipeEntity } from 'src/Recipes/entities/recipe.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('recipeIngredient')
export class RecipeIngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unit_mas: string;

  @Column()
  cant_ingr: string;

  // @Column()
  // ingredient_id: number;

  // @Column()
  // recipe_id: number;

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.id)
  // @JoinColumn({
  //   name: 'ingredient_id',
  //   referencedColumnName: 'ingredient_id',
  // })
  ingredient: IngredientEntity;

  @OneToOne(() => RecipeEntity, (recipe) => recipe.id)
  // @JoinColumn({
  //   name: 'recipe_id',
  //   referencedColumnName: 'recipe_id',
  // })
  recipe: RecipeEntity;
}
