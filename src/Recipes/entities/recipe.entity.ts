import { FavoriteEntity } from 'src/Favorites/entities/favorite.entity';
import { RecipeCategoryEntity } from 'src/RecipesCategory/entities/recipe-category.entity';
import { RecipeIngredientEntity } from 'src/RecipesIngredients/entities/recipe-ingredient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('recipe')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 500, nullable: true })
  description: string;

  @Column('varchar', { length: 4000 })
  instruction: string;

  @Column('varchar', { length: 500 })
  image: string;

  @Column({ nullable: false })
  recipeCategoryId: number;

  @ManyToOne(
    () => RecipeCategoryEntity,
    (recipeCategory) => recipeCategory.recipe,
    { eager: true },
  )
  @JoinColumn({ name: 'recipeCategoryId', referencedColumnName: 'id' })
  recipeCategory: RecipeCategoryEntity;

  // @OneToOne(
  //   () => RecipeIngredientEntity,
  //   (recipeIngredient) => recipeIngredient.recipe,
  // )
  // recipeIngredient: RecipeIngredientEntity;

  @OneToMany(
    () => RecipeIngredientEntity,
    (recipeIngredient) => recipeIngredient.recipe,
  )
  recipeIngredient: RecipeIngredientEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.recipe)
  favorite: FavoriteEntity[];
}
