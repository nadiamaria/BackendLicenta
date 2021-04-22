import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeEntity } from 'src/Recipes/entities/recipe.entity';

@Entity('recipeType')
export class RecipeTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500, unique: true })
  type_name: string;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.recipeType)
  recipe: RecipeEntity[];
}
