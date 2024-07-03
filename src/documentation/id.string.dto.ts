import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class IdStringDto {
  @IsUUID()
  @Type(() => String)
  @ApiProperty({
    type: 'string',
    example: '48a26ce4-5bfa-4b7e-9d33-f3f298dad8e4',
    required: true,
  })
  id: string;
}
