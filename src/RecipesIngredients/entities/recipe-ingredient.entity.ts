import { IngredientEntity } from 'src/Ingredients/entities/ingredient.entity';
import { RecipeEntity } from 'src/Recipes/entities/recipe.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipeIngredient')
export class RecipeIngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unit_mas: string;

  @Column()
  cant_ingr: string;

  @ManyToMany(() => IngredientEntity)
  @JoinTable()
  ingredient: IngredientEntity[];

  @OneToOne(() => RecipeEntity)
  @JoinColumn()
  recipe: RecipeEntity;
  // @ManyToOne(() => RecipeEntity, (recipe) => recipe.id)

  // // @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  // recipe: Recipe;

  // @ManyToMany(
  //   () => IngredientEntity,
  //   (ingredient) => ingredient.recipeIngredient,
  // )
  // ingredient: IngredientEntity[];
}
