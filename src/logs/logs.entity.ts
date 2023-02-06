import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '@/users/users.entity';


@Entity({ name: 'logs' })
export class LogsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  method: string;

  @Column()
  data: string;

  @Column()
  code: string;

  @ManyToOne(() => UsersEntity, (user) => user.logs)
  @JoinColumn() //添加了@JoinColumn，这是必选项并且只能在关系的一侧设置。 你设置@JoinColumn的哪一方，哪一方的表将包含一个"relation id"和目标实体表的外键。
  user: UsersEntity;
}
