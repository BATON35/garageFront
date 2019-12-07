/* tslint:disable */
import { Role } from './role';
export interface Worker {
  active?: number;
  email?: string;
  id?: number;
  name?: string;
  password?: string;
  roles?: Array<Role>;
  surname?: string;
  type?: 'SELLER' | 'MANAGER' | 'MECHANIC';
}
