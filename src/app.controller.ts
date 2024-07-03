import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetRequestId } from './decorators/get.request.id.decorator';
import { CreateStringResponse } from './documentation/create.string.response';
import { CreateStringDto } from './documentation/create.string.dto';
import { IdStringDto } from './documentation/id.string.dto';
import { GetStringResponse } from './documentation/get.string.response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateStringResponse })
  @ApiOperation({ summary: 'Получаем строку' })
  async createString(
    @GetRequestId() requestId: string,
    @Body(ValidationPipe) createStringDto: CreateStringDto,
  ): Promise<CreateStringResponse> {
    const response = await this.appService.createString(createStringDto);
    return new CreateStringResponse(requestId, response);
  }

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: GetStringResponse })
  @ApiOperation({ summary: 'Выдаём строку' })
  async getString(
    @GetRequestId() requestId: string,
    @Param(ValidationPipe) idDto: IdStringDto,
  ): Promise<GetStringResponse> {
    const response = await this.appService.getString(idDto);
    return new GetStringResponse(requestId, response);
  }
}
