/* tslint:disable */
import { WorkerDto } from './worker-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageWorkerDto {
  numberOfElements?: number;
  content?: Array<WorkerDto>;
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
