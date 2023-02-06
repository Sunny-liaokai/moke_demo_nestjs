import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { LogsEntity } from '../logs/logs.entity';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(LogsEntity)
    private readonly logsRepository: Repository<LogsEntity>,
  ) {}

  getUserAll() {
    return this.userRepository.find();
  }

  getUserOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async AddUser(user: UsersEntity) {
    // const data = await this.userRepository.create(user);
    return this.userRepository.save(user);
  }

  /*
   * 查询用户文章
   * */
  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true, //查询相关联的数据
      },
    });
  }

  /**
   * 查询用户日志
   */
  async findUserLogs(uid: number) {
    const user = await this.getUserOne(uid);
    return this.logsRepository.findOne({
      where: { user },
      relations: {
        user: true, //查询相关联的数据
      },
    });
  }

  async findLogsByGroup(id: number): Promise<any> {
    return this.logsRepository
      .createQueryBuilder('logs')
      .select('logs.code', 'code')
      .addSelect('COUNT("code")', 'count')
      .leftJoinAndSelect('logs.user', 'user') //查询相关联的
      .where('user.id=:id', { id })
      .groupBy('logs.code')
      .getRawMany(); // 获取原生的多个数据
  }
}
