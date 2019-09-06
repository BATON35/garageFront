/* tslint:disable */
import { ClientDto } from './client-dto';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageClientDto {
  numberOfElements?: number;
  content?: Array<ClientDto>;
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
