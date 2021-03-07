import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { RecipeIngredient } from 'src/RecipesIngredients/models/recipe-ingredient.models';
@Entity('recipe')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, unique: true })
  name: string;

  @Column('varchar', { length: 500 })
  description: string;

  @Column('varchar', { length: 4000 })
  instruction: string;

  @Column('varchar', { length: 500, unique: true })
  image: string;

  // @OneToMany(
  //   () => RecipeIngredientEntity,
  //   (RecipeIngredient) => RecipeIngredient.recipe,
  // )
  // RecipeIngredient: RecipeIngredient[];

  // @Column('numeric')
  // kcal: number
}
