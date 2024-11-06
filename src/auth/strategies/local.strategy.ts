import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('access_token'),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(decodedToken: any) {
    try {
      const { id } = decodedToken.data;
      const validatedUser = await this.userService.findOne(id);
      if (validatedUser) {
        return decodedToken;
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }
}
