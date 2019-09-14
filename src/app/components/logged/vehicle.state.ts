import { PageVehicleDto } from './../../../api/models/page-vehicle-dto';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { State, Action, StateContext } from '@ngxs/store';
import { VehicleDto } from './../../../api/models/vehicle-dto';
import { VehicleControllerRestService } from 'src/api/services';

export class VehicleCreateAction {
    static readonly type = '${name} create vehicle';
    constructor(public vehicleDto: VehicleDto, public clientId: number) { }
}
export class VehicleUpdateAction {
    static readonly type = '${name} update vehicle';
    constructor(public vehicleDto: VehicleDto) { }
}

export class VehicleStateModel {
    vehiclePage: PageVehicleDto;
    page: number;
    size: number;
}

@State<VehicleStateModel>({
    name: "vehicle",
    defaults: {
        vehiclePage: {},
        page: 0,
        size: 5
    }
})
export class VehicleState {
    constructor(public vehicleService: VehicleControllerRestService) { }
    @Action(VehicleUpdateAction)
    update(ctx: StateContext<VehicleStateModel>, { vehicleDto }: VehicleUpdateAction) {
        console.log("vehicle list state !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        return this.vehicleService.updateUsingPUT2(vehicleDto).pipe(tap(vehicle => console.log(vehicle)));
    }

    @Action(VehicleCreateAction)
    create(ctx: StateContext<VehicleStateModel>, { vehicleDto, clientId }: VehicleCreateAction) {
        console.log("vehicle list state !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        return this.vehicleService.saveUsingPOST2({ vehicleDto, clientId }).pipe(tap(vehicle => console.log(vehicle)));
    }
}



