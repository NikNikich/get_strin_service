import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import * as config from 'config';

export default class CustomResponse {
  @ApiProperty({ nullable: false, default: true })
  public readonly success: boolean;

  @ApiProperty({ nullable: false, example: '0.0.1' })
  public readonly apiVersion: string;

  @ApiProperty({ type: 'string', format: 'date-time', nullable: false })
  public readonly timestamp: Date;

  @ApiProperty({ nullable: false, example: 'jcMhP42G5CT2Y7F0' })
  public readonly requestId: string;

  @ApiProperty({ nullable: false, default: HttpStatus.OK })
  public readonly statusCode: number;

  constructor(requestId: string, success = true) {
    this.success = success;
    this.apiVersion = config.get('version');
    this.timestamp = new Date();
    this.requestId = requestId;
    this.statusCode = HttpStatus.OK;
  }
}
