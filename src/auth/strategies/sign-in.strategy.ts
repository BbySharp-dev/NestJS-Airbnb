import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class SignInStrategy extends PassportStrategy(Strategy, 'sign-in') {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.validate(email, password);
      if (!user) {
        throw new UnauthorizedException();
      } else {
        const data = this.jwtService.sign(
          { data: user },
          { secret: this.configService.get('SECRET_KEY') },
        );
        return { message: 'Successfully signed in!', access_token: data };
      }
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }
}
