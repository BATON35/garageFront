/* tslint:disable */
import { UserDto } from './user-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageUserDto {
  numberOfElements?: number;
  content?: Array<UserDto>;
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
