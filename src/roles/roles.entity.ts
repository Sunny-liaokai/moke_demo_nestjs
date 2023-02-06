import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '@/users/users.entity';


@Entity({ name: 'roles' })
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UsersEntity, (users) => users.roles)
  users: UsersEntity[];
}
