import { IngredientEntity } from 'src/Ingredients/entities/ingredient.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredientsCategory')
export class IngredientsCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500, unique: true })
  category_name: string;

  @OneToMany(
    () => IngredientEntity,
    (ingredient) => ingredient.ingredientsCategory,
  )
  ingredient: IngredientEntity[];
}
