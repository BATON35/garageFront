/* tslint:disable */
import { Role } from './role';
export interface Worker {
  name?: string;
  active?: number;
  email?: string;
  id?: number;
  login?: string;
  deleted?: boolean;
  password?: string;
  phoneNumber?: string;
  roles?: Array<Role>;
  surname?: string;
  type?: 'SELLER' | 'MANAGER' | 'MECHANIC';
}
