import { StringEntiy } from '../entity/string.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StringRepository extends Repository<StringEntiy> {
  constructor(private dataSource: DataSource) {
    super(StringEntiy, dataSource.createEntityManager());
  }
  public async createString(string: string): Promise<StringEntiy> {
    const stringEntity = new StringEntiy();
    stringEntity.name = string;
    return stringEntity.save();
  }
}
