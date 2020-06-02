/* tslint:disable */
import { Role } from './role';
export interface UserDto {
  login?: string;
  createdBy?: string;
  email?: string;
  id?: number;
  lastModifiedBy?: string;
  deleted?: boolean;
  name?: string;
  password?: string;
  phoneNumber?: string;
  roles?: Array<Role>;
  surname?: string;
}
