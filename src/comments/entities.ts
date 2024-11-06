import { Exclude } from 'class-transformer';
import { Room } from '../rooms/entities';
import { User } from '../users/entities';

export class Comment {
  id: number;

  @Exclude()
  room_id: number;

  room: Room;

  @Exclude()
  created_by_id: number;

  created_by: User;

  date: Date;

  content: string;

  rated: number;
}
