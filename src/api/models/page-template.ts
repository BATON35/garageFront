/* tslint:disable */
import { Template } from './template';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageTemplate {
  numberOfElements?: number;
  content?: Array<Template>;
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
