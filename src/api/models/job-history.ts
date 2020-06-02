/* tslint:disable */
import { CarServiceDto } from './car-service-dto';
import { PartDto } from './part-dto';
import { WorkerDto } from './worker-dto';
export interface JobHistory {
  carServiceDto?: CarServiceDto;
  createdDate?: string;
  partsDto?: Array<PartDto>;
  price?: number;
  workerDto?: WorkerDto;
}
