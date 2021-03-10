import { IngredientsCategoryEntity } from 'src/IngredientsCategory/entities/ingredients-category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredient')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500, unique: true })
  name: string;

  @Column()
  ingredientsCategory_id: number;

  @ManyToOne(
    () => IngredientsCategoryEntity,
    (ingredientsCategory) => ingredientsCategory.id,
  )
  @JoinColumn({
    name: 'ingredientsCategory_id',
    referencedColumnName: 'ingredientsCategory_id',
  })
  ingredientsCategory: IngredientsCategoryEntity;

  // @ManyToMany(
  //   () => RecipeIngredientEntity,
  //   (recipeIngredient) => recipeIngredient.ingredient,
  // )
  // recipeIngredient: RecipeIngredientEntity[];
}
