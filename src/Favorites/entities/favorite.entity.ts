import { RecipeEntity } from 'src/Recipes/entities/recipe.entity';
import { UserEntity } from 'src/Users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorite')
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 300 })
  name: string;

  @Column({ nullable: false })
  recipeId: number;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.favorite, { eager: true })
  @JoinColumn({ name: 'recipeId', referencedColumnName: 'id' })
  recipe: RecipeEntity;

  @ManyToOne(() => UserEntity, (user) => user.favorite, { eager: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
