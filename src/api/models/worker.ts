/* tslint:disable */
import { Role } from './role';
export interface Worker {
  active?: number;
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
