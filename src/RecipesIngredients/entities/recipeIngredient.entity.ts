import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipeIngredient')
export class RecipeIngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Recipe, (recipe) => recipe.id)
  // @JoinColumn({ name: 'recipeId', referencedColumnName: 'recipeId' })
  // recipe: Recipe;
}
