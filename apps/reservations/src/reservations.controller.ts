import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller("reservations")
//endpoints defined within /reservations 
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
      return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id') 
  //takes id from weburl
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id:string,
    @Body() UpdateReservationDto: UpdateReservationDto,
    ) {
      return this.reservationsService.update(id, UpdateReservationDto);
    }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.reservationsService.remove(id)
  }
}