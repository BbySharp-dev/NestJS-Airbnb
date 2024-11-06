import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

export class ReservationDTO {
  @IsInt()
  id?: number;

  @ApiProperty()
  @IsInt()
  reserved_by_id: number;

  @ApiProperty()
  @IsInt()
  room_id: number;

  @ApiProperty()
  @IsInt()
  guests: number;

  @ApiProperty()
  @IsDateString()
  arrival: Date;

  @ApiProperty()
  @IsDateString()
  departure: Date;
}

export class ReservationUpdateDTO extends ReservationDTO {
  @ApiPropertyOptional()
  reserved_by_id: number;

  @ApiPropertyOptional()
  room_id: number;

  @ApiPropertyOptional()
  guests: number;

  @ApiPropertyOptional()
  arrival: Date;

  @ApiPropertyOptional()
  departure: Date;
}
