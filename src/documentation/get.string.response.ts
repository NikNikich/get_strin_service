import { ApiProperty } from '@nestjs/swagger';
import CustomResponse from './custom.response';

export class GetStringResponse extends CustomResponse {
  @ApiProperty({ type: 'string', nullable: false })
  string: string;

  constructor(requestId: string, data: string) {
    super(requestId);
    this.string = data;
  }
}
