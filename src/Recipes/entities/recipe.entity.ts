import { FavoriteEntity } from 'src/Favorites/entities/favorite.entity';
import { RecipeCategoryEntity } from 'src/RecipesCategory/entities/recipe-category.entity';
import { RecipeIngredientEntity } from 'src/RecipesIngredients/entities/recipe-ingredient.entity';
import { RecipeTypeEntity } from 'src/RecipesType/entities/recipe-type.entity';
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

  @Column('varchar', { length: 200, nullable: false, unique: true })
  name: string;

  @Column('varchar', { length: 1000, nullable: false })
  description: string;

  @Column('varchar', { length: 4000, nullable: false })
  instruction: string;

  @Column('varchar', { length: 500, nullable: false })
  image: string;

  @Column({ nullable: false })
  kcal: number;

  @Column({ nullable: false })
  recipeCategoryId: number;

  @Column({ nullable: false })
  recipeTypeId: number;

  @ManyToOne(
    () => RecipeCategoryEntity,
    (recipeCategory) => recipeCategory.recipe,
    { eager: true },
  )
  @JoinColumn({ name: 'recipeCategoryId', referencedColumnName: 'id' })
  recipeCategory: RecipeCategoryEntity;

  @ManyToOne(() => RecipeTypeEntity, (recipeType) => recipeType.recipe, {
    eager: true,
  })
  @JoinColumn({ name: 'recipeTypeId', referencedColumnName: 'id' })
  recipeType: RecipeTypeEntity;

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
