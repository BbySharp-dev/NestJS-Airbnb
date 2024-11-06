import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LocationDTO {
  id?: number;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  photo?: string;
}

export class LocationUpdateDTO extends LocationDTO {
  @ApiPropertyOptional()
  address: string;

  @ApiPropertyOptional()
  city: string;

  @ApiPropertyOptional()
  country: string;
}
