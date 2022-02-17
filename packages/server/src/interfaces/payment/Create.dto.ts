import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
    IsString,
  } from 'class-validator';

export class CreateDTO {

    @IsInt()
    amount: number;

    @IsString()
    transactionId: number;

    @IsString()
    cardNumber: string;

    @IsDate()
    cardDate: Date;

    @IsString()
    cardBank: string;

    @IsString()
    via: string;

}