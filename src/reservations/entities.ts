import { Exclude } from 'class-transformer';
import { User } from 'src/users/entities';

export class Reservation {
  id: number;

  @Exclude()
  reserved_by_id: number;

  reserved_by: User;

  room_id: number;

  guests: number;

  arrival: Date;

  departure: Date;
}
