import { Injectable } from '@nestjs/common';
import { StringRepository } from './core/repository/string.repository';
import { CreateStringDto } from './documentation/create.string.dto';
import * as config from 'config';
import { IdStringDto } from './documentation/id.string.dto';
import { ErrorIf } from './errors/error.if';
import { NOT_STRING } from './errors/errors';

@Injectable()
export class AppService {
  constructor(private readonly stringRepository: StringRepository) {}
  async createString(createStringDto: CreateStringDto): Promise<string> {
    const stringEntity = await this.stringRepository.createString(
      createStringDto.string,
    );
    return `${config.get('server.back')}/${stringEntity.id}`;
  }

  async getString(idDto: IdStringDto): Promise<string> {
    const stringEntity = await this.stringRepository.findOne({
      where: { id: idDto.id, isUsed: false },
    });
    ErrorIf.isEmpty(stringEntity, NOT_STRING);
    stringEntity.isUsed = true;
    await stringEntity.save();
    return stringEntity.name;
  }
}
