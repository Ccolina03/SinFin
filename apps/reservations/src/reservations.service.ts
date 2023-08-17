import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto'
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, UserDTO } from '@app/common';
import { CurrentUser } from '@app/common/decorator/current-user.decorator';
@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}
  

  @UseGuards(JwtAuthGuard)
  async create(
    createReservationDto: CreateReservationDto,
    @CurrentUser() userId: UserDTO,
    ) {
    return await this.reservationRepository.create({
      ...createReservationDto,
      userId: userId._id,
      timeStamp: new Date(),
    })
  }

  findAll() {
    return this.reservationRepository.find({})
  }

  findOne(_id:string) {
    return this.reservationRepository.findOne({_id})
  }

  update(_id:string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      {_id},
      {$set: updateReservationDto}, //allows to overried existing properties on this document
    );
  }

  remove(_id: string) {
      return this.reservationRepository.findOneAndDelete({_id})
  }
}
