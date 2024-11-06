import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumberString,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class UserDTO {
  id?: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  avatar?: string;

  @ApiProperty({ default: 'minh truong' })
  @Matches(/\D+/g, { message: 'Invalid name!' })
  name: string;

  @ApiProperty({ default: 'truong@gmail.com' })
  @IsEmail(undefined, { message: 'Invalid email!' })
  email: string;

  @ApiProperty({ default: 'truong123@' })
  password: string;

  @ApiProperty({ default: '0934328213' })
  @IsNumberString(undefined, { message: 'Invalid phone number!' })
  phone: string;

  @ApiProperty({ default: new Date('2000-01-01').toISOString() })
  @IsDateString(undefined, { message: 'Invalid date string!' })
  birthday: Date;

  @ApiProperty({ enum: ['Male', 'Female', 'Undefined'] })
  @IsString()
  gender: 'Male' | 'Female' | 'Undefined';

  @ApiProperty({ enum: ['Guest', 'Admin'] })
  @IsString()
  role: 'Guest' | 'Admin';
}

export class UserUpdateDTO {
  @ApiPropertyOptional()
  @Matches(/\D+/g, { message: 'Invalid name!' })
  name: string;

  @ApiPropertyOptional()
  @IsEmail(undefined, { message: 'Invalid email!' })
  email: string;

  @ApiPropertyOptional()
  @IsNumberString(undefined, { message: 'Invalid phone number!' })
  phone: string;

  @ApiPropertyOptional()
  @IsDateString(undefined, { message: 'Invalid date string!' })
  birthday: Date;

  @ApiPropertyOptional({ enum: ['Male', 'Female', 'Undefined'] })
  @IsString()
  gender: 'Male' | 'Female' | 'Undefined';

  @ApiPropertyOptional({ enum: ['Guest', 'Admin'] })
  @IsString()
  role: 'Guest' | 'Admin';

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  avatar: string;
}

export class SignUpDTO {
  @ApiProperty()
  @Matches(/\D+/g, { message: 'Invalid name!' })
  name: string;

  @ApiProperty()
  @IsEmail(undefined, { message: 'Invalid email!' })
  email: string;

  @ApiProperty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain: minimum 8 characters, a digit, an uppercase, a lowercase and a special characters!',
    },
  )
  password: string;

  @ApiProperty()
  @IsNumberString(undefined, { message: 'Invalid phone number!' })
  phone: string;

  @ApiProperty({
    default: new Date().toISOString(),
  })
  @IsDateString(undefined, { message: 'Invalid date string!' })
  birthday: Date;

  @ApiProperty({ enum: ['Male', 'Female', 'Undefined'] })
  @IsString()
  gender: 'Male' | 'Female' | 'Undefined';
}

export class SignInDTO {
  @ApiProperty({ default: 'truong@gmail.com' })
  @IsEmail(undefined, { message: 'Invalid email address!' })
  email: string;

  @ApiProperty({ default: 'truong123@' })
  @IsString()
  password: string;
}

export class ChangePasswordDTO {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain: minimum 8 characters, a digit, an uppercase, a lowercase and a special characters!',
    },
  )
  newPassword: string;

  @ApiProperty()
  @IsString()
  confirmedNewPassword: string;
}
