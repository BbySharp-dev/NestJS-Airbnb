import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString } from 'class-validator';

export class CommentDTO {
  id?: number;

  @ApiProperty()
  @IsInt()
  room_id: number;

  @ApiProperty()
  @IsInt()
  created_by_id: number;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsInt()
  rated: number;
}

export class CommentUpdateDTO extends CommentDTO {
  @ApiPropertyOptional()
  room_id: number;

  @ApiPropertyOptional()
  created_by_id: number;

  @ApiPropertyOptional()
  date: Date;

  @ApiPropertyOptional()
  content: string;

  @ApiPropertyOptional()
  rated: number;
}
