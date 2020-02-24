/* tslint:disable */
import { Role } from './role';
export interface UserDto {
  active?: number;
  email?: string;
  id?: number;
  login?: string;
  name?: string;
  password?: string;
  phoneNumber?: string;
  roles?: Array<Role>;
  surname?: string;
}
