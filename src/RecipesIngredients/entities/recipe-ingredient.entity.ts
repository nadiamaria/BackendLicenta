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

  @Column({ nullable: false })
  unit_mas: string;

  @Column({ nullable: false })
  cant_ingr: number;

  @Column({ nullable: false })
  ingredientId: number;

  @Column({ nullable: false })
  recipeId: number;

  @ManyToOne(
    () => IngredientEntity,
    (ingredient) => ingredient.recipeIngredient,
    { eager: true },
  )
  @JoinColumn({ name: 'ingredientId', referencedColumnName: 'id' })
  ingredient: IngredientEntity;

  @ManyToOne(
    () => RecipeEntity,
    (recipe) => recipe.recipeIngredient,
    // eslint-disable-next-line prettier/prettier
    { eager: true },
  )
  @JoinColumn({ name: 'recipeId', referencedColumnName: 'id' })
  recipe: RecipeEntity;

  // @OneToOne(() => RecipeEntity, (recipe) => recipe.recipeIngredient, {
  //   eager: true,
  // })
  // @JoinColumn({ name: 'recipeId', referencedColumnName: 'id' })
  // recipe: RecipeEntity;

  // @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.id)
  // ingredient: IngredientEntity;

  // @OneToOne(() => RecipeEntity, (recipe) => recipe.id)
  // recipe: RecipeEntity;
}
