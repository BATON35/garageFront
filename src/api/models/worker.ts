/* tslint:disable */
import { Role } from './role';
export interface Worker {
  deleted?: boolean;
  email?: string;
  id?: number;
  login?: string;
  name?: string;
  password?: string;
  phoneNumber?: string;
  roles?: Array<Role>;
  surname?: string;
  type?: 'SELLER' | 'MANAGER' | 'MECHANIC';
}
