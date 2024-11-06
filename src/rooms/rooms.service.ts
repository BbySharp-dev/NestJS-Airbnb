import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoomDTO, RoomUpdateDTO } from './dto';

@Injectable()
export class RoomsService {
  private readonly prisma = new PrismaClient();

  async findAll(
    location_id: number,
    searchKeyword: string,
    records: number,
    page: number,
  ): Promise<RoomDTO[]> {
    const data: RoomDTO[] = await this.prisma.rooms.findMany({
      where: {
        OR: searchKeyword?.trim()
          ? [
              { name: { contains: searchKeyword } },
              {
                location: {
                  OR: [
                    { address: { contains: searchKeyword } },
                    { city: { contains: searchKeyword } },
                    { country: { contains: searchKeyword } },
                  ],
                },
              },
            ]
          : undefined,
        location_id: location_id || undefined,
      },
      include: { location: true },
      skip: records * (page - 1) || undefined,
      take: records || undefined,
    });
    return data;
  }

  async findOne(id: number): Promise<RoomDTO> {
    const room: RoomDTO = await this.prisma.rooms.findUnique({
      where: { id },
      include: { location: true },
    });
    return room;
  }

  async findOneByLocation(location_id: number): Promise<RoomDTO[]> {
    const data = await this.prisma.rooms.findMany({ where: { location_id } });
    return data;
  }

  async create(data: RoomDTO): Promise<RoomDTO> {
    const room: RoomDTO = await this.prisma.rooms.create({
      data,
      include: { location: true },
    });
    return room;
  }

  async update(id: number, data: RoomUpdateDTO): Promise<RoomDTO> {
    const room: RoomDTO = await this.prisma.rooms.update({
      where: { id },
      data,
      include: { location: true },
    });
    return room;
  }

  async delete(id: number): Promise<RoomDTO> {
    const room = await this.prisma.rooms.delete({ where: { id } });
    return room;
  }
}
