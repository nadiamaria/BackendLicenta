import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredientsCategory')
export class IngredientsCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500, unique: true })
  category_name: string;
}
