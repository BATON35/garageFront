/* tslint:disable */
import { CarServiceDto } from './car-service-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageCarServiceDto {
  numberOfElements?: number;
  content?: Array<CarServiceDto>;
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
