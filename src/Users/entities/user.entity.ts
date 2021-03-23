import { FavoriteEntity } from 'src/Favorites/entities/favorite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30, unique: true, nullable: false })
  username: string;

  @Column('varchar', { length: 50, unique: true, nullable: false })
  password: string;

  @Column('varchar', { length: 50, nullable: false })
  email: string;

  // @Column('varchar', { length: 50, nullable: true })
  // nume: string;

  // @Column('varchar', { length: 50, nullable: true })
  // prenume: string;

  // @Column('varchar', { length: 50, unique: true, nullable: true })
  // poza: string;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorite: FavoriteEntity[];
}
