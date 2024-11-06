import { Exclude } from 'class-transformer';
import { LocationDTO } from '../locations/dto';
export class Room {
  id: number;

  name: string;

  @Exclude()
  location_id: number;

  location: LocationDTO;

  price: number;

  description: string;

  photo?: string;

  beds: number;

  bathrooms: number;

  guests: number;

  bedrooms: number;

  washing_machine: 'true' | 'false';

  electric_iron: 'true' | 'false';

  television: 'true' | 'false';

  air_conditioner: 'true' | 'false';

  wifi: 'true' | 'false';

  stove: 'true' | 'false';

  parking: 'true' | 'false';

  swimming_pool: 'true' | 'false';
}
