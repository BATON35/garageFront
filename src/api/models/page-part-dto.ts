/* tslint:disable */
import { PartDto } from './part-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PagePartDto {
  numberOfElements?: number;
  content?: Array<PartDto>;
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
