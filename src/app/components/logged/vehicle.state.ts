import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { State, Action, StateContext } from '@ngxs/store';
import { VehicleDto } from './../../../api/models/vehicle-dto';
import { VehicleControllerRestService } from 'src/api/services';
import { PageUserDto } from 'src/api/models';

export class VehicleUpdateAction {
    static readonly type = '${name} update vehicle';
    constructor(public vehicleDto: VehicleDto) { }
}

export class VehicleStateModel {
    userPage: PageUserDto;
    page: number;
    size: number;
}

@State<VehicleStateModel>({
    name: "vehicle",
    defaults: {
        userPage: {},
        page: 0,
        size: 5
    }
})
export class VehicleState {
    constructor(public vehicleService: VehicleControllerRestService) { }
    @Action(VehicleUpdateAction)
    update({ vehicleDto }: VehicleUpdateAction) {
        // return this.vehicleService.updateUsingPUT2(vehicleDto);
        // console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    }
}
