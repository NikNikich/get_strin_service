import { ApiProperty } from '@nestjs/swagger';
import CustomResponse from './custom.response';

export class CreateStringResponse extends CustomResponse {
  @ApiProperty({ type: 'string', nullable: false })
  url: string;

  constructor(requestId: string, data: string) {
    super(requestId);
    this.url = data;
  }
}
