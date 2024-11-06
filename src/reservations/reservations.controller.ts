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
import { ReservationsService } from './reservations.service';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { ReservationDTO, ReservationUpdateDTO } from './dto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { Reservation } from './entities';

@UseGuards(LocalAuthGuard)
@ApiTags('Reservations')
@ApiHeader({ name: 'access_token', required: true })
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiQuery({ name: 'guestID', required: false })
  @ApiQuery({ name: 'id', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'records', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get('')
  async get(
    @Query('id') id: string,
    @Query('guestID') guestID: string,
    @Query('search') searchKeyword: string,
    @Query('records') records: string,
    @Query('page') page: string,
  ) {
    try {
      let data: any;

      if (id) {
        data = await this.reservationsService.findOne(+id);
      } else {
        data = await this.reservationsService.findAll(
          +guestID,
          searchKeyword,
          +records,
          +page,
        );
      }

      if (data?.length > 0 || data) {
        return {
          message: 'Successfully!',
          data: instanceToPlain(plainToClass(Reservation, data)),
        };
      } else {
        throw new NotFoundException();
      }
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }

  @Post('new')
  async create(@Body() data: ReservationDTO) {
    try {
      const reservation: ReservationDTO = await this.reservationsService.create(
        data,
      );
      return {
        message: 'A new reservation is successfully created!',
        data: reservation,
      };
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() data: ReservationUpdateDTO) {
    try {
      const reservation: ReservationDTO = await this.reservationsService.update(
        +id,
        data,
      );
      return { message: 'Successfully updated!', data: reservation };
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      await this.reservationsService.delete(+id);
      return { message: 'Successfully deleted!' };
    } catch (err) {
      throw err || new InternalServerErrorException();
    }
  }
}
