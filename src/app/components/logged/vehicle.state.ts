import { UsersPageAction } from './users.state';
import { VehicleControllerRestService } from 'src/api/services';
import { ClietnPageAction } from './client.state';
import { PageVehicleDto } from './../../../api/models/page-vehicle-dto';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { State, Action, StateContext } from '@ngxs/store';
import { VehicleDto } from './../../../api/models/vehicle-dto';

export class VehicleCreateAction {
    static readonly type = '${name} create vehicle';
    constructor(public vehicleDto: VehicleDto, public clientId: number) { }
}
export class VehicleUpdateAction {
    static readonly type = '${name} update vehicle';
    constructor(public vehicleDto: VehicleDto) { }
}

export class VehicleDeleteAction {
    static readonly type = '${name} delete vehicle';
    constructor(public id: number) { }
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
        return this.vehicleService.updateUsingPUT2(vehicleDto).pipe(tap(vehicle => {
            const page = ctx.getState().page
            const size = ctx.getState().size
            ctx.dispatch(new ClietnPageAction(page, size))
        }));
    }

    @Action(VehicleCreateAction)
    create(ctx: StateContext<VehicleStateModel>, { vehicleDto, clientId }: VehicleCreateAction) {
        console.log("vehicle list state !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        return this.vehicleService.saveUsingPOST2({ vehicleDto, clientId }).pipe(tap(vehicle => {
            ctx.dispatch(new ClietnPageAction(null, null))
        }));
    }
    @Action(VehicleDeleteAction)
    delete(ctx: StateContext<VehicleStateModel>, { id }: VehicleDeleteAction) {
        console.log(id)
        return this.vehicleService.deleteUsingDELETE3(id).pipe(tap(value => {
            ctx.dispatch(new ClietnPageAction(null, null))
        }));
    }
}



