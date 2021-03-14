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

  @Column('varchar', { length: 500, unique: true })
  name: string;

  @Column({ nullable: false })
  ingredientCategoryId: number;

  @ManyToOne(
    () => IngredientsCategoryEntity,
    (ingredientsCategory) => ingredientsCategory.ingredient,
    { eager: true },
  )
  @JoinColumn({ name: 'ingredientCategoryId', referencedColumnName: 'id' })
  ingredientsCategory: IngredientsCategoryEntity;

  @OneToMany(
    () => RecipeIngredientEntity,
    (recipeIngredient) => recipeIngredient.ingredient,
  )
  recipeIngredient: RecipeIngredientEntity[];
}
