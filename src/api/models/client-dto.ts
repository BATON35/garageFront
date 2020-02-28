/* tslint:disable */
import { VehicleDto } from './vehicle-dto';
export interface ClientDto {
  deleted?: boolean;
  email?: string;
  id?: number;
  name?: string;
  phoneNumber?: string;
  surname?: string;
  vehicles?: Array<VehicleDto>;
}
