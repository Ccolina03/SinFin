import {IsDate, IsNotEmpty, IsString} from 'class-validator'
import { Type } from 'class-transformer';

export class CreateReservationDto {
    @IsDate()
    //convert string representing dates to Date
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date; 

    @IsNotEmpty()
    @IsString()
    preferredName: string;

    @IsNotEmpty()
    @IsString()
    stopId: string;

    @IsNotEmpty()
    @IsString()
    billId: string;
    //timestamp  and userId generated in server
}
