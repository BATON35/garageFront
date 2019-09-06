/* tslint:disable */
import { VehicleDto } from './vehicle-dto';
export interface ClientDto {
  active?: number;
  email?: string;
  id?: number;
  name?: string;
  phoneNumber?: string;
  surname?: string;
  vehicles?: Array<VehicleDto>;
}
