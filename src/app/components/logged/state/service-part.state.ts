import { State, Action, StateContext } from '@ngxs/store';
import { ServicePartControllerRestService } from 'src/api/services';
import { tap } from 'rxjs/operators';
import { ServicePartDto, PageServicePartDto } from 'src/api/models';

export class SaveServicePartAction {
  static readonly type = '[ServicePart] SaveServicePartAction';
  constructor(public workerId: number, public partId: number, public serviceId: number, public vehiclePlateNumber: string) { }
}

export class CreateServicePartAction {
  static readonly type = '[ServicePart] CreateServicePartAction';
  constructor(public servicePartDto: ServicePartDto) { }
}

export class LoadServicePageAction {
  static readonly type = '[ServicePart] LoadServicePageAction';
  constructor(public page: number, public size: number) { }
}

export class ServicePartStateModel {
  public pageServicePartDto: PageServicePartDto;
}

@State<ServicePartStateModel>({
  name: 'servicePart',
  defaults: {
    pageServicePartDto: {}
  }
})
export class ServicePartState {
  constructor(public servicePartControllerRestService: ServicePartControllerRestService) { }
  @Action(CreateServicePartAction)
  add(ctx: StateContext<ServicePartStateModel>, { servicePartDto }: CreateServicePartAction) {
    this.servicePartControllerRestService.saveServicePartUsingPOST(servicePartDto).pipe(
      tap(value => {
        console.log(value)
      })
    )
  }
  @Action(LoadServicePageAction)
  loadServicePage(ctx: StateContext<ServicePartStateModel>, { page, size }: LoadServicePageAction) {
    return this.servicePartControllerRestService.getServicePartListUsingGET({ size, page }).pipe(
      tap(servicePart => ctx.patchState({
        pageServicePartDto: servicePart
      })
      ))
  }
  @Action(SaveServicePartAction)
  saveServicePart(ctx: StateContext<ServicePartStateModel>, { workerId, serviceId, partId, vehiclePlateNumber }: SaveServicePartAction) {
    console.log(workerId + '/n ' + serviceId + ' ' + partId + ' ' + vehiclePlateNumber)

    return this.servicePartControllerRestService.saveServicePartUsingPOST({
      workerId, serviceId, partIds: [partId], vehicleNumberPlate: vehiclePlateNumber

    })
  }
}


