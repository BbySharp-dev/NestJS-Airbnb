import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ReservationDTO, ReservationUpdateDTO } from './dto';

@Injectable()
export class ReservationsService {
  private readonly prisma = new PrismaClient();

  async findAll(
    userID: number,
    searchKeyword: string,
    records: number,
    page: number,
  ): Promise<ReservationDTO[]> {
    const data: ReservationDTO[] = await this.prisma.reservations.findMany({
      where: {
        OR: searchKeyword?.trim()
          ? [
              {
                reserved_by: {
                  OR: [
                    { name: { contains: searchKeyword } },
                    { email: { contains: searchKeyword } },
                    { phone: { contains: searchKeyword } },
                  ],
                },
              },
            ]
          : undefined,
        reserved_by_id: userID || undefined,
      },
      include: { reserved_by: true },
      skip: records * (page - 1) || undefined,
      take: records || undefined,
    });
    return data;
  }

  async findOne(id: number): Promise<ReservationDTO> {
    const reservation: ReservationDTO =
      await this.prisma.reservations.findFirst({
        where: { id },
      });
    return reservation;
  }

  async create(data: ReservationDTO): Promise<ReservationDTO> {
    const reservation = await this.prisma.reservations.create({ data });
    return reservation;
  }

  async update(
    id: number,
    data: ReservationUpdateDTO,
  ): Promise<ReservationDTO> {
    const reservation: ReservationDTO = await this.prisma.reservations.update({
      where: { id },
      data,
    });
    return reservation;
  }

  async delete(id: number): Promise<ReservationDTO> {
    const reservation: ReservationDTO = await this.prisma.reservations.delete({
      where: { id },
    });
    return reservation;
  }
}
