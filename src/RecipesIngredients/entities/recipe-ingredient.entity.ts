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

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.id)
  ingredient: IngredientEntity;

  @OneToOne(() => RecipeEntity, (recipe) => recipe.id)
  recipe: RecipeEntity;
}
