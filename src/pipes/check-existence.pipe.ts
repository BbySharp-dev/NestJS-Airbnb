import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { User } from 'src/users/entities';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CheckExistencePipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(user: User, metadata: ArgumentMetadata) {
    if (user.email || user.phone) {
      const isExisted = await this.usersService.checkExistence(user);
      if (isExisted) {
        throw new BadRequestException(
          'This email/phone number is already existed!',
        );
      }
    }
    return user;
  }
}

export class asas {}
