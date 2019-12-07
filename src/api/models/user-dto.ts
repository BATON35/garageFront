/* tslint:disable */
import { Role } from './role';
export interface UserDto {
  active?: number;
  email?: string;
  id?: number;
  name?: string;
  password?: string;
  roles?: Array<Role>;
  surname?: string;
}
