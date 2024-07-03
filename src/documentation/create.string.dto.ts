import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStringDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Новая строка',
    required: true,
  })
  string: string;
}
