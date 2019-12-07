/* tslint:disable */
import { ServicePartDto } from './service-part-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageServicePartDto {
  numberOfElements?: number;
  content?: Array<ServicePartDto>;
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
