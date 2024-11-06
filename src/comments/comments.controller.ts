import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDTO } from './dto';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { Comment } from './entities';

@UseGuards(LocalAuthGuard)
@ApiTags('Comments')
@ApiHeader({ name: 'access_token', required: true })
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiQuery({ name: 'id', required: false })
  @ApiQuery({ name: 'roomID', required: false })
  @ApiQuery({ name: 'records', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get('')
  async get(
    @Query('id') id: string,
    @Query('roomID') roomID: string,
    @Query('records') records: string,
    @Query('page') page: string,
  ) {
    try {
      let data: any;

      if (id) {
        data = await this.commentsService.findOne(+id);
      } else {
        data = await this.commentsService.findAll(+roomID, +records, +page);
      }

      if (data?.length > 0 || data) {
        return {
          message: 'Successfully!',
          data: instanceToPlain(plainToClass(Comment, data)),
        };
      } else {
        throw new NotFoundException();
      }
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }

  @Post('new')
  async create(@Body() data: CommentDTO) {
    try {
      const comment: CommentDTO = await this.commentsService.create(data);
      return { message: 'Successfully posted!', data: comment };
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }

  @Put('update/:id')
  async udpate(@Param('id') id: string, @Body() data: CommentDTO) {
    try {
      const comment: CommentDTO = await this.commentsService.update(+id, data);
      return { message: 'Successfully updated!', data: comment };
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      await this.commentsService.delete(+id);
      return { message: 'Successfully deleted!' };
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }
}
