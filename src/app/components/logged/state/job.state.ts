import { State, Action, StateContext } from '@ngxs/store';
import { JobControllerService } from 'src/api/services';
import { tap } from 'rxjs/operators';
import { PageJobDto, JobResponseDto, JobStatisticIncome } from 'src/api/models';

export class LoadHistoryAction {
  static readonly type = '[Job] LoadHistoryAction';
  constructor(public vehicleId: number) { }
}
export class SaveJobAction {
  static readonly type = '[Job] SaveJobAction';
  constructor(public workerId: number, public partIds: number[], public serviceId: number, public vehiclePlateNumber: string) { }
}

export class LoadJobPageAction {
  static readonly type = '[Job] LoadJobPageAction';
  constructor(public page: number, public size: number) { }
}
export class JobStatisticAction {
  static readonly type = '[Job] JobStatisticAction';
  constructor() { }
}


export class JobStateModel {
  public pageJobDto: PageJobDto;
  public jobHistory: JobResponseDto[];
  public statistic: JobStatisticIncome[];
}



@State<JobStateModel>({
  name: 'job',
  defaults: {
    pageJobDto: {},
    jobHistory: [],
    statistic: []
  }
})
export class JobState {
  constructor(public JobControllerService: JobControllerService) { }

  @Action(LoadJobPageAction)
  loadServicePage(ctx: StateContext<JobStateModel>, { page, size }: LoadJobPageAction) {
    return this.JobControllerService.getJobListUsingGET({ size, page }).pipe(
      tap(job => ctx.patchState({
        pageJobDto: job
      })
      ));
  }
  @Action(SaveJobAction)
  saveJob(ctx: StateContext<JobStateModel>, { workerId, serviceId, partIds, vehiclePlateNumber }: SaveJobAction) {
    console.log('saveJobAction')
    console.log(partIds);
    return this.JobControllerService.saveJobUsingPOST({
      workerId, serviceId, partIds, vehicleNumberPlate: vehiclePlateNumber

    });
  }
  @Action(LoadHistoryAction)
  loadHistory(ctx: StateContext<JobStateModel>, { vehicleId }: LoadHistoryAction) {
    return this.JobControllerService.getJobHistoryUsingGET(vehicleId).pipe(
      tap(job => ctx.patchState({
        jobHistory: job
      }))
    );
  }
  @Action(JobStatisticAction)
  jobStatistic(ctx: StateContext<JobStateModel>, { }: JobStatisticAction) {
    return this.JobControllerService.getStatisticUsingGET().pipe(
      tap(statistic => ctx.patchState({
        statistic
      }))
    );
  }
}


