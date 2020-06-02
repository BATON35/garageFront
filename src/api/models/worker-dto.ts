/* tslint:disable */
import { Role } from './role';
export interface WorkerDto {
  name?: string;
  createdBy?: string;
  email?: string;
  id?: number;
  lastModifiedBy?: string;
  login?: string;
  deleted?: boolean;
  password?: string;
  phoneNumber?: string;
  roles?: Array<Role>;
  surname?: string;
  type?: 'SELLER' | 'MANAGER' | 'MECHANIC';
}
