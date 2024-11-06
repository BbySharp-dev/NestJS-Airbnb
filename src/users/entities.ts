import { Expose } from 'class-transformer';

export class User {
  id?: number;

  avatar?: string;

  name: string;

  email: string;

  @Expose({ groups: ['admin'] })
  password: string;

  phone: string;

  birthday: Date;

  gender: 'Male' | 'Female' | 'Undefined';

  role?: 'Guest' | 'Admin';
}
