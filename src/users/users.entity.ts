import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LogsEntity } from '../logs/logs.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { RolesEntity } from '../roles/roles.entity';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => LogsEntity, (logs) => logs.user)
  logs: LogsEntity[];

  @ManyToMany(() => RolesEntity, (roles) => roles.users)
  @JoinTable({ name: 'users_roles' }) //将会在user和roles中间产生一个新表 必须选项 两边只要写一侧
  roles: RolesEntity[];

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile: ProfileEntity;
}
