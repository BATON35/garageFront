import {Action, State, StateContext} from '@ngxs/store';
import {JobControllerService} from 'src/api/services';
import {tap} from 'rxjs/operators';
import {JobHistory, PageJobDto} from 'src/api/models';
import {MatSnackBar} from '@angular/material';
import {ClearUserAction, UsersStateModel} from '../users.state';

export class LoadHistoryAction {
  static readonly type = '[Job] LoadHistoryAction';

  constructor(public vehicleId: number) {
  }
}

export class SaveJobAction {
  static readonly type = '[Job] SaveJobAction';

  constructor(public workerId: number, public partIds: number[], public serviceId: number, public vehiclePlateNumber: string) {
  }
}

export class LoadJobPageAction {
  static readonly type = '[Job] LoadJobPageAction';

  constructor(public page: number, public size: number) {
  }
}

export class ClearJobAction {
  static readonly type = '[Job] ClearJobAction';

  constructor(public workerId: number) {
  }
}

export class JobStateModel {
  public pageJobDto: PageJobDto;
  public jobHistory: JobHistory[];
  public workerId: number;
}


@State<JobStateModel>({
  name: 'job',
  defaults: {
    pageJobDto: {},
    jobHistory: [],
    workerId: null
  }
})
export class JobState {
  constructor(public JobControllerService: JobControllerService,
              public matSnackBar: MatSnackBar) {
  }

  @Action(LoadJobPageAction)
  loadServicePage(ctx: StateContext<JobStateModel>, {page, size}: LoadJobPageAction) {
    return this.JobControllerService.getJobListUsingGET({size, page}).pipe(
      tap(job => ctx.patchState({
          pageJobDto: job
        })
      ));
  }

  @Action(SaveJobAction)
  saveJob(ctx: StateContext<JobStateModel>, {workerId, serviceId, partIds, vehiclePlateNumber}: SaveJobAction) {
    return this.JobControllerService.saveJobUsingPOST({
      workerId, serviceId, partIds, vehicleNumberPlate: vehiclePlateNumber
    }).pipe(tap(serviceCar => {
      ctx.dispatch(new ClearJobAction(workerId));
      this.matSnackBar.open('zapisano', 'zapisano', {duration: 2000});
    }));
  }

  @Action(LoadHistoryAction)
  loadHistory(ctx: StateContext<JobStateModel>, {vehicleId}: LoadHistoryAction) {
    return this.JobControllerService.getJobHistoryUsingGET(vehicleId).pipe(
      tap(job => ctx.patchState({
        jobHistory: job
      }))
    );
  }

  @Action(ClearJobAction)
  clearVehicle(ctx: StateContext<JobStateModel>, {workerId}: ClearJobAction) {
    ctx.patchState({
      workerId: null
    });
  }
}


