import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  InternalServerErrorException,
  BadRequestException,
  UseInterceptors,
  Put,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from 'src/users/dto';
import { SignInGuard } from './guards/sign-in.guard';
import { UsersService } from 'src/users/users.service';
import { ApiBody, ApiConsumes, ApiTags, ApiHeader } from '@nestjs/swagger';
import { Request as Req } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangePasswordDTO } from '../users/dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CheckExistencePipe } from 'src/pipes/check-existence.pipe';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { User } from 'src/users/entities';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(SignInGuard)
  @Post('sign-in')
  async signIn(@Body() user: SignInDTO, @Request() req: Req) {
    return req.user;
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: SignUpDTO,
  })
  @Post('sign-up')
  @UseInterceptors(FileInterceptor(null))
  async signUp(@Body(CheckExistencePipe) data: SignUpDTO) {
    try {
      const user = await this.usersService.create({
        ...data,
        role: 'Guest',
      });
      return {
        message: 'Sign up successfully!',
        data: instanceToPlain(plainToClass(User, user, { groups: ['guest'] }), {
          groups: ['guest'],
        }),
      };
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }

  @UseGuards(LocalAuthGuard)
  @ApiHeader({ name: 'access_token', required: true })
  @ApiBody({ type: ChangePasswordDTO })
  @Put('change-password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() data: ChangePasswordDTO,
  ) {
    try {
      const { oldPassword, newPassword, confirmedNewPassword } = data;
      if (newPassword === confirmedNewPassword) {
        await this.usersService.changePassword(
          +id,
          oldPassword,
          confirmedNewPassword,
        );
        return { message: 'Successfully changed the password!' };
      } else {
        throw new BadRequestException('Password does not match!');
      }
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }
}
