import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredient')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500, unique: true })
  name: string;
}
