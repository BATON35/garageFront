import { State, Action, StateContext } from '@ngxs/store';
import { JobControllerService } from 'src/api/services';
import { tap } from 'rxjs/operators';
import { JobDto, PageJobDto, JobResponseDto } from 'src/api/models';

export class LoadHistoryAction {
  static readonly type = '[ServicePart] LoadHistoryAction';
  constructor(public vehicleId: number) { }
}
export class SaveJobAction {
  static readonly type = '[ServicePart] SaveServicePartAction';
  constructor(public workerId: number, public partId: number, public serviceId: number, public vehiclePlateNumber: string) { }
}

export class CreateServicePartAction {
  static readonly type = '[ServicePart] CreateServicePartAction';
  constructor(public servicePartDto: JobDto) { }
}

export class LoadServicePageAction {
  static readonly type = '[ServicePart] LoadServicePageAction';
  constructor(public page: number, public size: number) { }
}

export class ServicePartStateModel {
  public pageServicePartDto: PageJobDto;
  public serviceHistory: JobResponseDto[];
}

@State<ServicePartStateModel>({
  name: 'servicePart',
  defaults: {
    pageServicePartDto: {},
    serviceHistory: []
  }
})
export class ServicePartState {
  constructor(public JobControllerService: JobControllerService) { }
  @Action(CreateServicePartAction)
  add(ctx: StateContext<ServicePartStateModel>, { servicePartDto }: CreateServicePartAction) {
    this.JobControllerService.saveJobUsingPOST(servicePartDto).pipe(
      tap(value => {
        console.log(value);
      })
    );
  }
  @Action(LoadServicePageAction)
  loadServicePage(ctx: StateContext<ServicePartStateModel>, { page, size }: LoadServicePageAction) {
    return this.JobControllerService.getJobListUsingGET({ size, page }).pipe(
      tap(servicePart => ctx.patchState({
        pageServicePartDto: servicePart
      })
      ));
  }
  @Action(SaveJobAction)
  saveServicePart(ctx: StateContext<ServicePartStateModel>, { workerId, serviceId, partId, vehiclePlateNumber }: SaveJobAction) {
    console.log(workerId + '/n ' + serviceId + ' ' + partId + ' ' + vehiclePlateNumber);

    return this.JobControllerService.saveJobUsingPOST({
      workerId, serviceId, partIds: [partId], vehicleNumberPlate: vehiclePlateNumber

    });
  }
  @Action(LoadHistoryAction)
  loadHistory(ctx: StateContext<ServicePartStateModel>, { vehicleId }: LoadHistoryAction) {
    return this.JobControllerService.getJobHistoryUsingGET(vehicleId).pipe(
      tap(servicePart => ctx.patchState({
        serviceHistory: servicePart
      }))
    );
  }
}


