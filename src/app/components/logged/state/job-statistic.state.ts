import { JobStatisticAction } from './job-statistic.actions';
import { JobControllerService } from 'src/api/services';
import { State, Action, StateContext } from '@ngxs/store';
import { JobStateModel } from './job.state';
import { tap } from 'rxjs/operators';
import { JobStatisticIncome } from 'src/api/models';

export class JobStatisticStateModel {
  public statistic: JobStatisticIncome[];
}

@State<JobStatisticStateModel>({
  name: 'jobStatistic',
  defaults: {
    statistic: []
  }
})
export class JobStatisticState {
  constructor(public JobControllerService: JobControllerService) { }
  @Action(JobStatisticAction)
  jobStatistic(ctx: StateContext<JobStatisticStateModel>, { }: JobStatisticAction) {
    return this.JobControllerService.getStatisticUsingGET().pipe(
      tap(statistic => ctx.patchState({
        statistic
      }))
    );
  }

}
