import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipe')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500, unique: true })
  name: string;

  @Column('varchar', { length: 500 })
  image: string;

  // @Column('numeric')
  // kcal: number
}
