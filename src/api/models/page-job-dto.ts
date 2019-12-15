/* tslint:disable */
import { JobDto } from './job-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageJobDto {
  numberOfElements?: number;
  content?: Array<JobDto>;
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
