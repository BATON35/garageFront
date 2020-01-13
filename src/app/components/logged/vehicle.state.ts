import { VehicleControllerRestService, FileControllerService } from 'src/api/services';
import { ClietnPageAction } from './client.state';
import { PageVehicleDto } from './../../../api/models/page-vehicle-dto';
import { tap, catchError } from 'rxjs/operators';
import { State, Action, StateContext } from '@ngxs/store';
import { VehicleDto } from './../../../api/models/vehicle-dto';
import { UploadVehiclePhotoAction } from './state/file.state';
import { empty } from 'rxjs';

export class ClearVehicleAction {
    static readonly type = '[Vehicle] ClearVehicleAction';
    constructor() { }
}
export class AutoCompleteNameVehicleAction {
    static readonly type = '[Vehicle] AutoCompleteNameVehicleAction';
    constructor(public text: string) { }
}
export class ToggleNotificationAction {
    static readonly type = '[Vehicle] ToggleNotificationAction';
    constructor(public id: number) { }
}
export class VehicleCreateAction {
    static readonly type = '[Vehicle] VehicleCreateAction';
    constructor(public vehicleDto: VehicleDto, public clientId: number) { }
}
export class VehicleUpdateAction {
    static readonly type = '[Vehicle] VehicleUpdateAction';
    constructor(public vehicleDto: VehicleDto, public file: File[]) { }
}

export class VehicleDeleteAction {
    static readonly type = '[Vehicle] VehicleDeleteAction';
    constructor(public id: number) { }
}

export class BackToDefoultVehicleAction {
    static readonly type = '[Vehicle] BackToDefoultVehicleAction';
    constructor() { }
}

export class VehicleStateModel {
    vehiclePage: PageVehicleDto;
    page: number;
    size: number;
    autocompleteVehicle: VehicleDto[];
    errorMessage: string;
    ok: boolean;
}

@State<VehicleStateModel>({
    name: 'vehicle',
    defaults: {
        vehiclePage: {},
        page: 0,
        size: 5,
        autocompleteVehicle: [],
        errorMessage: null,
        ok: false
    }
})
export class VehicleState {
    constructor(public vehicleService: VehicleControllerRestService, public fileService: FileControllerService) { }
    @Action(VehicleUpdateAction)
    update(ctx: StateContext<VehicleStateModel>, { vehicleDto, file }: VehicleUpdateAction) {
        return this.vehicleService.updateVehicleUsingPUT(vehicleDto).pipe(
            tap(vehicle => {
                const page = ctx.getState().page;
                const size = ctx.getState().size;
                ctx.dispatch(new ClietnPageAction(page, size));
                ctx.dispatch(new UploadVehiclePhotoAction(file, vehicle.id));
                console.log('VehicleUpdateAction!!!!!!');
                ctx.patchState({
                    ok: true
                });
            }),
            catchError((err, caught) => {
                ctx.patchState({
                    errorMessage: err.error.message
                });
                return empty();
            })
        );
    }

    @Action(VehicleCreateAction)
    create(ctx: StateContext<VehicleStateModel>, { vehicleDto, clientId }: VehicleCreateAction) {
        return this.vehicleService.saveVehicleUsingPOST({ vehicleDto, clientId }).pipe(tap(vehicle => {
            ctx.dispatch(new ClietnPageAction(null, null));
        }));
    }
    @Action(VehicleDeleteAction)
    delete(ctx: StateContext<VehicleStateModel>, { id }: VehicleDeleteAction) {
        console.log(id);
        return this.vehicleService.deleteVehicleUsingDELETE(id).pipe(tap(value => {
            ctx.dispatch(new ClietnPageAction(null, null));
        }));
    }
    @Action(ToggleNotificationAction)
    toggleNotiofication(ctx: StateContext<VehicleStateModel>, { id }: ToggleNotificationAction) {
        return this.vehicleService.toggleNotificationUsingPATCH(id);
    }
    @Action(BackToDefoultVehicleAction)
    backToDefoultVehicle(ctx: StateContext<VehicleStateModel>, BackToDefoultVehicleAction) {
        ctx.patchState({
            vehiclePage: {},
            page: 0,
            size: 5
        });
    }
    @Action(AutoCompleteNameVehicleAction)
    autoCompleteNameVehicle(ctx: StateContext<VehicleStateModel>, { text }: AutoCompleteNameVehicleAction) {
        return this.vehicleService.autocompleteVehicleUsingGET(text).pipe(
            tap(vehicle => ctx.patchState({
                autocompleteVehicle: vehicle
            }))
        );
    }
    @Action(ClearVehicleAction)
    clearVehicle(ctx: StateContext<VehicleStateModel>, { }: ClearVehicleAction) {
        console.log('clear vehicle action !!!!!!!');
        ctx.patchState({
            errorMessage: null,
            ok: false
        });
    }
}



