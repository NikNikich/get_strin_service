import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm/typeorm.config';
import { StringEntiy } from './core/entity/string.entity';
import { StringRepository } from './core/repository/string.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([StringEntiy]),
  ],
  controllers: [AppController],
  providers: [AppService, StringRepository],
})
export class AppModule {}
