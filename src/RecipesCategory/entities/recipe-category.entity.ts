import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeEntity } from 'src/Recipes/entities/recipe.entity';

@Entity('recipeCategory')
export class RecipeCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 500, unique: true })
  category_name: string;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.recipeCategory)
  recipe: RecipeEntity[];
}
