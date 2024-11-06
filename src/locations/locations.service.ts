import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LocationUpdateDTO, LocationDTO } from './dto';

@Injectable()
export class LocationsService {
  private readonly prisma = new PrismaClient();

  async findAll(
    searchKeyword: string,
    records: number,
    page: number,
  ): Promise<LocationDTO[]> {
    const data: LocationDTO[] = await this.prisma.locations.findMany({
      where: {
        OR: searchKeyword?.trim()
          ? [
              { address: { contains: searchKeyword || undefined } },
              { city: { contains: searchKeyword || undefined } },
              { country: { contains: searchKeyword || undefined } },
            ]
          : undefined,
      },
      skip: records * (page - 1) || undefined,
      take: records || undefined,
    });
    return data;
  }

  async findOne(id: number): Promise<LocationDTO> {
    const location: LocationDTO = await this.prisma.locations.findUnique({
      where: { id },
    });
    return location;
  }

  async create(data: LocationDTO): Promise<LocationDTO> {
    const location: LocationDTO = await this.prisma.locations.create({ data });
    return location;
  }

  async update(id: number, data: LocationUpdateDTO): Promise<LocationDTO> {
    const location: LocationDTO = await this.prisma.locations.update({
      where: { id },
      data,
    });
    return location;
  }

  async delete(id: number): Promise<LocationDTO> {
    const location: LocationDTO = await this.prisma.locations.delete({
      where: { id },
    });
    return location;
  }
}
