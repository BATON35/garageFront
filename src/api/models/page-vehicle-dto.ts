/* tslint:disable */
import { VehicleDto } from './vehicle-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageVehicleDto {
  numberOfElements?: number;
  content?: Array<VehicleDto>;
  first?: boolean;
  last?: boolean;
  number?: number;
  empty?: boolean;
  pageable?: Pageable;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
