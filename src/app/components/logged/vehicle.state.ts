import { VehicleControllerRestService, FileControllerService } from 'src/api/services';
import { ClietnPageAction } from './client.state';
import { PageVehicleDto } from './../../../api/models/page-vehicle-dto';
import { tap } from 'rxjs/operators';
import { State, Action, StateContext } from '@ngxs/store';
import { VehicleDto } from './../../../api/models/vehicle-dto';

export class UploadVehiclePhotoAction {
    static readonly type = '${name} uload vehicle photo';
    constructor(public file: File, public vehicleId: number) { }
}

export class AutoCompleteNameVehicleAction {
    static readonly type = '${name} auto complete name vehicle';
    constructor(public text: string) { }
}
export class ToggleNotificationAction {
    static readonly type = '${name} toggle notification';
    constructor(public id: number) { }
}
export class VehicleCreateAction {
    static readonly type = '${name} create vehicle';
    constructor(public vehicleDto: VehicleDto, public clientId: number) { }
}
export class VehicleUpdateAction {
    static readonly type = '${name} update vehicle';
    constructor(public vehicleDto: VehicleDto, public file: File) { }
}

export class VehicleDeleteAction {
    static readonly type = '${name} delete vehicle';
    constructor(public id: number) { }
}

export class BackToDefoultVehicleAction {
    static readonly type = '${name} back to defoult vehicle';
    constructor() { }
}

export class VehicleStateModel {
    vehiclePage: PageVehicleDto;
    page: number;
    size: number;
    autocompleteVehicle: VehicleDto[]
}

@State<VehicleStateModel>({
    name: "vehicle",
    defaults: {
        vehiclePage: {},
        page: 0,
        size: 5,
        autocompleteVehicle: []
    }
})
export class VehicleState {
    constructor(public vehicleService: VehicleControllerRestService, public fileService: FileControllerService) { }
    @Action(VehicleUpdateAction)
    update(ctx: StateContext<VehicleStateModel>, { vehicleDto, file }: VehicleUpdateAction) {
        return this.vehicleService.updateVehicleUsingPUT(vehicleDto).pipe(tap(vehicle => {
            const page = ctx.getState().page
            const size = ctx.getState().size
            ctx.dispatch(new ClietnPageAction(page, size))
            ctx.dispatch(new UploadVehiclePhotoAction(file, vehicle.id))
        }));
    }

    @Action(VehicleCreateAction)
    create(ctx: StateContext<VehicleStateModel>, { vehicleDto, clientId }: VehicleCreateAction) {
        return this.vehicleService.saveVehicleUsingPOST({ vehicleDto, clientId }).pipe(tap(vehicle => {
            ctx.dispatch(new ClietnPageAction(null, null))
        }));
    }
    @Action(VehicleDeleteAction)
    delete(ctx: StateContext<VehicleStateModel>, { id }: VehicleDeleteAction) {
        console.log(id)
        return this.vehicleService.deleteVehicleUsingDELETE(id).pipe(tap(value => {
            ctx.dispatch(new ClietnPageAction(null, null))
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
        })
    }
    @Action(AutoCompleteNameVehicleAction)
    autoCompleteNameVehicle(ctx: StateContext<VehicleStateModel>, { text }: AutoCompleteNameVehicleAction) {
        return this.vehicleService.autocompleteVehicleUsingGET(text).pipe(
            tap(vehicle => ctx.patchState({
                autocompleteVehicle: vehicle
            }))
        )
    }
    @Action(UploadVehiclePhotoAction)

    uploadVehiclePhoto(ctx: StateContext<VehicleStateModel>, { file, vehicleId }: UploadVehiclePhotoAction) {
        return this.fileService.uploadFotoCarUsingPOST({ vehicleId, multipartFile: file })
    }

}



