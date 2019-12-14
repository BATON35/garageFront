/* tslint:disable */
import { CarServiceDto } from './car-service-dto';
import { PartDto } from './part-dto';
export interface ServicePartResponseDto {
  carServiceDto?: CarServiceDto;
  createdDate?: string;
  partDto?: Array<PartDto>;
}
