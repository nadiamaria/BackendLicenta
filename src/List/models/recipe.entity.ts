import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipe')
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 500, unique: true })
  name: string;

  @Column('varchar', { length: 500 })
  description: string;

  // @Column('numeric')
  // kcal: number
}
