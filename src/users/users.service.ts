import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from './entities';
import { UserUpdateDTO, UserDTO } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly prisma = new PrismaClient();

  async findAll(
    searchKeyword: string,
    records: number,
    page: number,
  ): Promise<UserDTO[]> {
    const data: UserDTO[] = await this.prisma.users.findMany({
      where: searchKeyword?.trim() && {
        OR: [
          {
            name: {
              contains: searchKeyword,
            },
          },
          {
            email: {
              contains: searchKeyword,
            },
          },
          {
            phone: {
              contains: searchKeyword,
            },
          },
        ],
      },
      skip: records * (page - 1) || undefined,
      take: records || undefined,
    });
    return data;
  }

  async findOne(id: number): Promise<UserDTO> {
    const user: UserDTO = await this.prisma.users.findUnique({ where: { id } });
    return user;
  }

  async checkExistence({ email, phone }: User): Promise<UserDTO> {
    const user: UserDTO = await this.prisma.users.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    return user;
  }

  async validate(email: string, password: string): Promise<UserDTO | Error> {
    const user: UserDTO = await this.prisma.users.findFirst({
      where: { email },
    });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return user;
      } else {
        throw new UnauthorizedException('Incorrect email or password!');
      }
    } else {
      return null;
    }
  }

  async create(data: UserDTO): Promise<UserDTO> {
    const hashedPassword: string = await bcrypt.hash(data.password, 10);
    const user: UserDTO = await this.prisma.users.create({
      data: { ...data, password: hashedPassword },
    });
    return user;
  }

  async update(id: number, data: UserUpdateDTO): Promise<UserDTO> {
    const user: UserDTO = await this.prisma.users.update({
      where: { id },
      data,
    });
    return user;
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<UserDTO | Error> {
    const user: UserDTO = await this.prisma.users.findUnique({ where: { id } });
    if (user) {
      if (await bcrypt.compare(oldPassword, user.password)) {
        const hashedNewPassword: string = await bcrypt.hash(newPassword, 10);
        const updatedUser: UserDTO = await this.prisma.users.update({
          where: { id },
          data: { password: hashedNewPassword },
        });
        return updatedUser;
      } else {
        throw new UnauthorizedException('Incorrect password!');
      }
    } else {
      throw new NotFoundException();
    }
  }

  async delete(id: number): Promise<UserDTO | Error> {
    const isExisted: User = await this.findOne(id);
    if (isExisted) {
      const user: UserDTO = await this.prisma.users.delete({ where: { id } });
      return user;
    } else throw new NotFoundException();
  }
}
