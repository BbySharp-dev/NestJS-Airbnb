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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoomDTO, RoomUpdateDTO } from './dto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { Room } from './entities';
import { CompressImagePipe } from 'src/pipes/compress-image.pipe';

@UseGuards(LocalAuthGuard)
@ApiTags('Rooms')
@ApiHeader({ name: 'access_token', required: true })
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiQuery({ name: 'id', required: false })
  @ApiQuery({ name: 'locationID', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'records', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get()
  async get(
    @Query('id') id: string,
    @Query('locationID') location_id: string,
    @Query('search') searchKeyword: string,
    @Query('records') records: string,
    @Query('page') page: string,
  ) {
    try {
      let data: any;

      if (id) {
        data = await this.roomsService.findOne(+id);
      } else {
        data = await this.roomsService.findAll(
          +location_id,
          searchKeyword,
          +records,
          +page,
        );
      }

      if (data?.length === 0 || !data) {
        throw new NotFoundException();
      } else {
        return {
          message: 'Successfully!',
          data: instanceToPlain(plainToClass(Room, data)),
        };
      }
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: RoomDTO,
  })
  @UseInterceptors(FileInterceptor('photo'))
  @Post('new')
  async create(
    @Body() data: RoomDTO,
    @UploadedFile(CompressImagePipe) photo: Express.Multer.File,
  ) {
    try {
      const room: RoomDTO = await this.roomsService.create({
        ...data,
        photo: data?.photo !== null ? photo && photo?.filename : null,
      });
      return {
        message: 'Successfully created!',
        data: instanceToPlain(plainToClass(Room, room)),
      };
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: RoomUpdateDTO,
  })
  @UseInterceptors(FileInterceptor('photo'))
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: RoomDTO,
    @UploadedFile(CompressImagePipe) photo: Express.Multer.File,
  ) {
    try {
      const room = await this.roomsService.update(+id, {
        ...data,
        photo: data?.photo !== null ? photo && photo?.filename : null,
      });
      return {
        message: 'Successfully created!',
        data: instanceToPlain(plainToClass(Room, room)),
      };
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      await this.roomsService.delete(+id);
      return { message: 'Successfully deleted!' };
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }
}
