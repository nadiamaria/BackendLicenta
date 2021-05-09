import { FavoriteEntity } from 'src/Favorites/entities/favorite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, nullable: false, unique: true })
  email: string;

  @Column('varchar', { length: 20, nullable: false })
  name: string;

  @Column('varchar', { length: 20, nullable: true })
  role: string;

  @Column('varchar', { nullable: false })
  password: string;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorite: FavoriteEntity[];
}
