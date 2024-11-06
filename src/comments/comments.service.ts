import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CommentDTO } from './dto';

@Injectable()
export class CommentsService {
  private readonly prisma = new PrismaClient();

  async findAll(
    roomID: number,
    records: number,
    page: number,
  ): Promise<CommentDTO[]> {
    const data: CommentDTO[] = await this.prisma.comments.findMany({
      where: { room_id: roomID || undefined },
      include: { created_by: true, room: true },
      skip: records * (page - 1) || undefined,
      take: records || undefined,
    });
    return data;
  }

  async findOne(id: number): Promise<CommentDTO> {
    const comment: CommentDTO = await this.prisma.comments.findFirst({
      where: { id },
    });
    return comment;
  }

  async create(data: CommentDTO): Promise<CommentDTO> {
    const comment: CommentDTO = await this.prisma.comments.create({ data });
    return comment;
  }

  async update(id: number, data: CommentDTO): Promise<CommentDTO> {
    const comment: CommentDTO = await this.prisma.comments.update({
      where: { id },
      data,
    });
    return comment;
  }

  async delete(id: number): Promise<CommentDTO> {
    const comment: CommentDTO = await this.prisma.comments.delete({
      where: { id },
    });
    return comment;
  }
}
