import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RoomDTO {
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Type(() => Number)
  location_id: number;

  @ApiProperty()
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  photo?: string;

  @ApiProperty()
  @Type(() => Number)
  beds: number;

  @ApiProperty()
  @Type(() => Number)
  bathrooms: number;

  @ApiProperty()
  @Type(() => Number)
  guests: number;

  @ApiProperty()
  @Type(() => Number)
  bedrooms: number;

  @ApiProperty({ enum: ['true', 'false'] })
  washing_machine: 'true' | 'false';

  @ApiProperty({ enum: ['true', 'false'] })
  electric_iron: 'true' | 'false';

  @ApiProperty({ enum: ['true', 'false'] })
  television: 'true' | 'false';

  @ApiProperty({ enum: ['true', 'false'] })
  air_conditioner: 'true' | 'false';

  @ApiProperty({ enum: ['true', 'false'] })
  wifi: 'true' | 'false';

  @ApiProperty({ enum: ['true', 'false'] })
  stove: 'true' | 'false';

  @ApiProperty({ enum: ['true', 'false'] })
  parking: 'true' | 'false';

  @ApiProperty({ enum: ['true', 'false'] })
  swimming_pool: 'true' | 'false';
}

export class RoomUpdateDTO extends RoomDTO {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  location_id: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  beds: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  bathrooms: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  guests: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  bedrooms: number;

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  washing_machine: 'true' | 'false';

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  electric_iron: 'true' | 'false';

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  television: 'true' | 'false';

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  air_conditioner: 'true' | 'false';

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  wifi: 'true' | 'false';

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  stove: 'true' | 'false';

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  parking: 'true' | 'false';

  @ApiPropertyOptional({ enum: ['true', 'false'] })
  swimming_pool: 'true' | 'false';
}
