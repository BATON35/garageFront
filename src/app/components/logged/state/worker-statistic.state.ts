import { State, Action, StateContext } from '@ngxs/store';
import { WorkerStatisticAction } from './worker-statistic.actions';
import { WorkerControllerRestService } from 'src/api/services';
import { WorkerStatisticSell } from 'src/api/models';
import { tap } from 'rxjs/operators';

export class WorkerStatisticStateModel {
  public statistic: WorkerStatisticSell[];
}

@State<WorkerStatisticStateModel>({
  name: 'workerStatistic',
  defaults: {
    statistic: []
  }
})
export class WorkerStatisticState {
  constructor(public workerControllerRestService: WorkerControllerRestService) { }
  @Action(WorkerStatisticAction)
  getStatistic(ctx: StateContext<WorkerStatisticStateModel>, action: WorkerStatisticAction) {
    console.log('WorkerStatistic   ')
    return this.workerControllerRestService.getStatisticUsingGET().pipe(
      tap(statistic => ctx.patchState({
        statistic
      }))
    );
  }
}
