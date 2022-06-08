import { Transform } from 'class-transformer';
import {
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude,
    IsString,
  } from 'class-validator';
  
  export class GetEstimateDTO  {
    @IsString()
    make: string;
  
    @IsString()
    model: string;
    
    @Transform(({value})=> parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;
  

    @Transform(({value})=> parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
  
    @Transform(({value})=> parseFloat(value))
    @IsLongitude()
    lng: number;

    @Transform(({value})=> parseFloat(value))
    @IsLatitude()
    lat: number;
  
    // @IsNumber()
    // @Min(0)
    // @Max(1000000)
    // price: number;
  }
  