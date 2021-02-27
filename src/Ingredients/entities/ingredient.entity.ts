import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipe')
export class IngredientsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500, unique: true })
  name: string;

  @Column('varchar', { length: 500 })
  image: string;
}
