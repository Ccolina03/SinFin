export class CreateReservationDto {
    startDate: Date;
    endDate: Date; 
    preferredName: string;
    stopId: string;
    billId: string;
    //timestamp  and userId generated in server
}
