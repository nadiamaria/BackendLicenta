import { IngredientsCategoryEntity } from 'src/IngredientsCategory/entities/ingredients-category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredient')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500, unique: true })
  name: string;

  @ManyToOne(
    () => IngredientsCategoryEntity,
    (ingredientsCategory) => ingredientsCategory.id,
  )
  ingredientsCategory: IngredientsCategoryEntity;

  // @ManyToOne(
  //   () => IngredientsCategoryEntity,
  //   (ingredientsCategory) => ingredientsCategory.ingredient,
  // )
  // ingredientsCategory: IngredientsCategoryEntity;
}
