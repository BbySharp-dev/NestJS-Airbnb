import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, decodedToken, info) {
    if (err || !decodedToken) {
      throw (
        err ||
        new UnauthorizedException('Please sign in or create new account!')
      );
    }
    return decodedToken;
  }
}
