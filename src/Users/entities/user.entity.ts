import { FavoriteEntity } from 'src/Favorites/entities/favorite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30, unique: true })
  username: string;

  @Column('varchar', { length: 50 })
  parola: string;

  @Column('varchar', { length: 50 })
  nume: string;

  @Column('varchar', { length: 50 })
  prenume: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 50, unique: true })
  poza: string;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorite: FavoriteEntity[];
}
